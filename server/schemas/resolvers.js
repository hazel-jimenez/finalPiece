const { User, Ad } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("ads")
          .populate("favorites");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    ads: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ad.find(params).sort({ createdAt: -1 });
    },
    ad: async (parent, { _id }) => {
      return Ad.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("favorites")
        .populate("ads");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("favorites")
        .populate("ads");
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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addAd: async (parent, args, context) => {
      if (context.user) {
        const ad = await Ad.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { ads: ad._id } },
          { new: true }
        );

        return ad;
      }

      throw new AuthenticationError("You need to be logged in!");
      },
    
    addReview: async (parent, { adId, reviewBody }, context) => {
      if (context.user) {
        const updatedAd = await Ad.findOneAndUpdate(
          { _id: adId },
          {
            $push: {
              reviews: { reviewBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedAd;
      }

      throw new AuthenticationError("You need to be logged in!");
      },
    
      addFavorite: async (parent, { favoriteId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { favorites: favoriteId } },
            { new: true }
          ).populate('favorites');
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      }      
  },
};

module.exports = resolvers;
