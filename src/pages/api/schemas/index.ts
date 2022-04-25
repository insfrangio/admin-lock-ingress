import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  enum AuthType {
    Admin
    User
    Invited
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    phoneNumber: Int
    department: String
    authType: AuthType!
  }

  input userInput {
    firstName: String!
    lastName: String!
    phoneNumber: Int
    department: String
    authType: AuthType!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User!
  }

  type Mutation {
    newUser(input: userInput): User!
    updateUser(id: ID!, input: userInput): User!
    deleteUser(id: ID!): String
  }
`;

module.exports = typeDefs;
