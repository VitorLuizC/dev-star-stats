import { gql } from "apollo-server-cloud-functions";

import signInURLTypeDefs from "./domains/signInURL/typeDefs";
import signInWithCodeTypeDefs from "./domains/signInWithCode/typeDefs";
import userTypeDefs from "./domains/user/typeDefs";
import repositoryTypeDefs from "./domains/repository/typeDefs";

const typeDefs = gql`
  type Query {
    _root: Int
  }

  type Mutation {
    _root: Int
  }

  ${signInURLTypeDefs}
  ${signInWithCodeTypeDefs}
  ${userTypeDefs}
  ${repositoryTypeDefs}
`;

export default typeDefs;
