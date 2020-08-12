import { gql } from "apollo-server-cloud-functions";

const typeDefs = gql`
  type Stargazer {
    user: User!
    starredAt: String!
  }

  type Repository {
    link: String!
    name: String!
    owner: User!
    stargazers: [Stargazer!]!
    description: String
  }

  extend type Query {
    repositories(username: String!): [Repository!]!
  }
`;

export default typeDefs;
