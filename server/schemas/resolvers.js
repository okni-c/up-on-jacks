const { User, Build } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('builds')
                    .populate('followers');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        builds: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Build.find(params).sort({ createdAt: -1 });
        },
        build: async (parent, { _id }) => {
            return Build.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('followers')
                .populate('builds');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('followers')
                .populate('builds');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addBuild: async (parent, args, context) => {
            if (context.user) {
                const build = await Build.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { builds: build._id } },
                    { new: true }
                );

                return build;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { buildId, commentBody }, context) => {
            if (context.user) {
                const updatedBuild = await Build.findOneAndUpdate(
                    { _id: buildId },
                    { $push: { builds: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedBuild;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;