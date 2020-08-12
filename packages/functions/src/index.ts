import { ApolloServer } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import verifyJWT from "./JWT/verifyJWT";
import type IContext from "./domains/graphql/IContext";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV === "development",
  introspection: process.env.NODE_ENV === "development",
  context: ({ req, res }): IContext => ({
    req,
    res,
    user: verifyJWT(req),
  }),
});

const handler = server.createHandler({
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.WEB_APPLICATION_URL
        : true,
    credentials: true,
  },
});

export const graphql = functions.https.onRequest(handler);
