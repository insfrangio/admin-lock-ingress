const User = require('../../../db/models/user');

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find({});

        return users;
      } catch (err) {
        console.log(err);
      }
    },
    getUser: async (_, { id }) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }
  },
  Mutation: {
    newUser: async (_, { input }) => {
      try {
        const user = new User(input);

        const result = await user.save();

        return result;
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (_, { id, input }) => {
      let user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      user = await User.findOneAndUpdate({ _id: id }, input, {
        new: true
      });

      return User;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      await User.findOneAndDelete({ _id: id });

      return 'User deleted';
    }
  }
};

module.exports = resolvers;
