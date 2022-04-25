import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      phoneNumber
      department
      authType
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      department
      authType
    }
  }
`;

export const NEW_USER = gql`
  mutation NewUser($input: userInput) {
    newUser(input: $input) {
      id
      firstName
      lastName
      phoneNumber
      department
      authType
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: userInput) {
    updateUser(id: $id, input: $input) {
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
