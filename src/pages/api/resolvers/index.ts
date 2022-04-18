const User = require('../../../db/models/user');

const resolvers = {
  Query: {
    // getUsers: async () => {
    //   try {
    //     const users = await axios.get('https://api.github.com/users');
    //     return users.data.map(({ id, login, avatar_url }) => ({
    //       id,
    //       login,
    //       avatar_url
    //     }));
    //   } catch (error) {
    //     console.log('error');
    //     throw error;
    //   }
    // },
    // getUser: async (_, args) => {
    //   try {
    //     const user = await axios.get(
    //       `https://api.github.com/users/${args.name}`
    //     );
    //     return {
    //       id: user.data.id,
    //       login: user.data.login,
    //       avatar_url: user.data.avatar_url
    //     };
    //   } catch (error) {
    //     console.log('error');
    //     throw error;
    //   }
    // }
    getUsers: async () => {
      try {
        const users = await User.find({});

        return users;
      } catch (err) {
        console.log(err);
      }
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
    }
  }
};

module.exports = resolvers;
