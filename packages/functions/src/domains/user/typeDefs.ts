import { gql } from "apollo-server-cloud-functions";

export type { default as User } from "./User";

const typeDefs = gql`
  type User {
    link: String!
    username: String!
    avatarURL: String!
  }

  extend type Query {
    user(username: String!): User
  }
`;

export default typeDefs;
