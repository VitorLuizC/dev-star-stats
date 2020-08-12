import type Repository from "./Repository";
import getRepositoriesByUsername from "./getRepository";
import { AuthenticationError } from "apollo-server-cloud-functions";
import createResolver from "../graphql/createResolver";

const repositoriesResolver = createResolver<Repository[], { username: string }>(
  ({ args, context }) => {
    if (!context.user)
      throw new AuthenticationError(
        `You must be signed-in to request this field.`
      );
    return getRepositoriesByUsername(context.user.token)(args.username);
  }
);

const resolvers = {
  Query: {
    repositories: repositoriesResolver,
  },
};

export default resolvers;
