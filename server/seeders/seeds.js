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
    const usertitle = faker.name.jobTitle();
    const city = faker.address.city();
    const state = faker.address.stateAbbr();
    const profileimg = 'https://loremflickr.com/960/540/avatar';

    userData.push({ username, email, password, usertitle, city, state, profileimg });
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
    const buildDescription = faker.lorem.paragraph(4,'\n');

    const manufacturer = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const year = faker.finance.amount(1970, 2015, 0).toString();
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

    const profileimg = 'https://loremflickr.com/960/540/avatar';

    await Build.updateOne(
      { _id: buildId },
      { $push: { comments: { commentBody, username, profileimg } } },
      { runValidators: true }
    );
  }

  // create build images
  for (let i = 0; i < 500; i += 1) {
    const image = 'https://loremflickr.com/960/540/car';

    const randomBuildIndex = Math.floor(Math.random() * createdBuilds.length);
    const { _id: buildId } = createdBuilds[randomBuildIndex];

    await Build.updateOne(
      { _id: buildId },
      { $push: { buildimages: { image } } },
      { runValidators: true }
    );
  }

  // create modlist
  for (let i = 0; i < 550; i += 1) {
    const modtitle = faker.commerce.productMaterial() + ' ' + faker.commerce.product();

    const randomBuildIndex = Math.floor(Math.random() * createdBuilds.length);
    const { _id: buildId } = createdBuilds[randomBuildIndex];

    await Build.updateOne(
      { _id: buildId },
      { $push: { mods: { modtitle } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
