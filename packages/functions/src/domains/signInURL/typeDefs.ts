import {gql} from 'apollo-server-cloud-functions';

const typeDefs = gql`
  extend type Query {
    signInURL: String!
  }
`;

export default typeDefs;
