const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../db/models/user');

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, userName } = user;
  const payload = {
    id,
    userName
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

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
    login: async (_, { input }) => {
      const { userName, password } = input;

      const userFound = await User.findOne({
        userName: userName.toLowerCase()
      });
      if (!userFound) throw new Error('Usuario o contrasenha incorrecta');

      const passwordSuccess = await bcryptjs.compare(
        password,
        userFound.password
      );

      if (!passwordSuccess) throw new Error('Usuario o contrasenha incorrecta');

      return {
        token: createToken(userFound, process.env.SECRET_KEY, '24h')
      };
    },

    newUser: async (_, { input }) => {
      const newUser = input;
      newUser.userName = newUser.userName.toLowerCase();

      const { userName, password } = newUser;
      const foundUserName = await User.findOne({ userName });

      // Revisa si el username ya esta en uso
      if (foundUserName) throw new Error('El nombre de usuario ya esta en uso');

      // Encriptar contrasenha
      const salt = await bcryptjs.genSaltSync(10);
      newUser.password = await bcryptjs.hash(password, salt);

      try {
        const user = new User(newUser);

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
