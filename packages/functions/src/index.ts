import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

const handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});

export const graphql = functions.https.onRequest(handler);
