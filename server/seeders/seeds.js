const faker = require("faker");

const db = require('../config/connection');
const { Build, User } = require('../models');

db.once('open', async () => {
  await Build.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create followers
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let followerId = userId;

    while (followerId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      followerId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
  }

  // create builds
  let createdBuilds = [];
  for (let i = 0; i < 100; i += 1) {
    const buildDescription = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const manufacturer = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const year = faker.finance.amount(1970, 2015, 0);
    const img = 'https://loremflickr.com/960/540/car';

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdBuild = await Build.create({ buildDescription, username, manufacturer, model, year, img });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { builds: createdBuild._id } }
    );

    createdBuilds.push(createdBuild);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomBuildIndex = Math.floor(Math.random() * createdBuilds.length);
    const { _id: buildId } = createdBuilds[randomBuildIndex];

    await Build.updateOne(
      { _id: buildId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
