import { gql } from "apollo-server-cloud-functions";

import signInURLTypeDefs from "./domains/signInURL/typeDefs";
import signInWithCodeTypeDefs from "./domains/signInWithCode/typeDefs";

const typeDefs = gql`
  type Query {
    _root: Int
  }

  type Mutation {
    _root: Int
  }

  ${signInURLTypeDefs}
  ${signInWithCodeTypeDefs}
`;

export default typeDefs;
