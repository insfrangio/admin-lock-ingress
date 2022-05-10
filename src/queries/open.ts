import { gql } from '@apollo/client';

export const UPDATE_OPEN = gql`
  mutation UpdateOpen($id: ID!, $input: OpenInput) {
    updateOpen(id: $id, input: $input) {
      id
      open
    }
  }
`;
