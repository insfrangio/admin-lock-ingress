import { gql } from '@apollo/client';

export const GET_VERIFY = gql`
  query GetVerify {
    getVerified {
      mode
      id
    }
  }
`;

export const UPDATE_VERIFY = gql`
  mutation UpdateVerify($id: ID!, $input: VerifiedInput) {
    updateVerified(id: $id, input: $input) {
      id
      mode
    }
  }
`;

export const NEW_VERIFY = gql`
  mutation NewVerify($input: VerifiedInput) {
    newVerified(input: $input) {
      id
      mode
    }
  }
`;
