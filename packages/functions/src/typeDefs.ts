import { gql } from 'apollo-server-cloud-functions';

import signInURLTypeDefs from './domains/signInURL/typeDefs';

const typeDefs = gql`
  type Query {
    version: String!
  }

  ${signInURLTypeDefs}
`;

export default typeDefs;
