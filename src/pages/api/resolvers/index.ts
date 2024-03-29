import { AuthType } from './../../../generated/graphql';
import { User, Card, Verified, Open } from '@/db/models/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

type InputUser = {
  userName: string;
  password: string;
};

type InputVerified = {
  mode: boolean;
};

type InputOpen = {
  open: boolean;
};

const createToken = (
  user: { id: string; userName: string; authType: AuthType },
  SECRET_KEY: jwt.Secret,
  expiresIn: string
) => {
  const { id, userName, authType } = user;
  const payload = {
    id,
    userName,
    authType
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

const resolvers = {
  Query: {
    getVerified: async () => {
      try {
        const verified = await Verified.find({});

        return verified;
      } catch (err) {
        console.log('Get verify', err);
      }
    },
    getOpen: async () => {
      try {
        const open = await Open.find({});

        return open;
      } catch (err) {
        console.log('Get Open', err);
      }
    },
    getCards: async () => {
      try {
        const cards = await Card.find({});

        return cards;
      } catch (err) {
        console.log('Get Cards', err);
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find({});

        return users;
      } catch (err) {
        console.log(err);
      }
    },
    getUser: async (_: unknown, { id }: Record<string, string>) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }
  },
  Mutation: {
    login: async (_: unknown, { input }: Record<string, InputUser>) => {
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
        token: createToken(userFound, process.env.SECRET_KEY || '', '24h')
      };
    },

    updateVerified: async (
      _: unknown,
      { id, input }: Record<string, InputVerified>
    ) => {
      let verify = await Verified.findById(id);

      if (!verify) {
        throw new Error('Verified not found');
      }

      verify = await Verified.findOneAndUpdate({ _id: id }, input, {
        new: true
      });

      return verify;
    },
    updateOpen: async (
      _: unknown,
      { id, input }: Record<string, InputOpen>
    ) => {
      let open = await Open.findById(id);

      if (!open) {
        throw new Error('Open not found');
      }

      open = await Open.findOneAndUpdate({ _id: id }, input, {
        new: true
      });

      return Open;
    },
    newUser: async (_: unknown, { input }: Record<string, InputUser>) => {
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
    newVerified: async (
      _: unknown,
      { input }: Record<string, InputVerified>
    ) => {
      try {
        const verify = new Verified(input);

        const result = await verify.save();

        return result;
      } catch (err) {
        console.log(err);
      }
    },
    newOpen: async (_: unknown, { input }: Record<string, InputOpen>) => {
      try {
        const open = new Open(input);

        const result = await open.save();

        return result;
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (
      _: unknown,
      { id, input }: Record<string, InputUser>
    ) => {
      let user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      user = await User.findOneAndUpdate({ _id: id }, input, {
        new: true
      });

      return User;
    },
    deleteUser: async (_: unknown, { id }: Record<string, string>) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      await User.findOneAndDelete({ _id: id });

      return 'User deleted';
    }
  }
};

export default resolvers;
