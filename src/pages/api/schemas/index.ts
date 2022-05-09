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

  type Card {
    id: ID
    card_id: Int
  }

  type Verified {
    id: ID
    mode: Boolean
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

  input VerifiedInput {
    mode: Boolean
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Subscription {
    verifiedMode: Verified!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User!
    getCards: [Card]!
    getVerified: [Verified]!
  }

  type Mutation {
    newUser(input: UserInput): User!
    newVerified(input: VerifiedInput): Verified!
    updateUser(id: ID!, input: UserInput): User!
    updateVerified(id: ID!, input: VerifiedInput): Verified!
    deleteUser(id: ID!): String
    login(input: LoginInput): Token
  }
`;

export default typeDefs;
