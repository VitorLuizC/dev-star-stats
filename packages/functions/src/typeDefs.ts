import { gql } from "apollo-server-cloud-functions";

const typeDefs = gql`
  type Query {
    version: String!
  }
`;

export default typeDefs;
