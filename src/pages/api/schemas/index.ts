import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  enum AuthType {
    Admin
    User
    Invited
  }

  enum Department {
    Directive
    RRHH
    Sales
    Marketing
    FinanceAndAccounting
    Logistics
    Cleaning
    Budgets
    Management
    Invited
  }

  type Token {
    token: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    documentNumber: Int
    phoneNumber: Int
    department: Department
    authType: AuthType
    userName: String
    password: String
  }

  input UserInput {
    firstName: String!
    lastName: String
    userName: String!
    password: String!
    documentNumber: Int!
    phoneNumber: Int
    department: Department!
    authType: AuthType!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User!
  }

  type Mutation {
    newUser(input: UserInput): User!
    updateUser(id: ID!, input: UserInput): User!
    deleteUser(id: ID!): String
    login(input: LoginInput): Token
  }
`;

export default typeDefs;
