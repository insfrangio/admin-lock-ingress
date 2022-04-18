import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    phoneNumber: String
    department: String
  }

  input userInput {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    department: String!
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    newUser(input: userInput): User!
  }
`;

module.exports = typeDefs;
