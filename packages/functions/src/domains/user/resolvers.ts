import type User from "./User";
import createResolver from "../graphql/createResolver";
import { AuthenticationError } from "apollo-server-cloud-functions";

import getUserByUsername from "./getUser";

type UserVariables = {
  username: string;
};

const userResolver = createResolver<null | User, UserVariables>(
  ({ args, context }) => {
    if (!context.user)
      throw new AuthenticationError(
        `You must be signed-in to request this field.`
      );

    return getUserByUsername(context.user.token)(args.username);
  }
);

const resolvers = {
  Query: {
    user: userResolver,
  },
};

export default resolvers;
