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
      documentNumber
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
      documentNumber
      password
      userName
    }
  }
`;

export const NEW_USER = gql`
  mutation NewUser($input: UserInput) {
    newUser(input: $input) {
      id
      firstName
      lastName
      phoneNumber
      department
      authType
      documentNumber
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput) {
    updateUser(id: $id, input: $input) {
      firstName
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
