import { gql } from 'apollo-server-cloud-functions';

/**
 * Input of sign-in with code.
 */
export type SignInWithCodeInput = {
  code: string;
};

const typeDefs = gql`
  input SignInWithCodeInput {
    code: String!
  }

  extend type Mutation {
    signInWithCode(input: SignInWithCodeInput!): String!
  }
`;

export default typeDefs;
