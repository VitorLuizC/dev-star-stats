import type { SignInWithCodeInput } from "./typeDefs";
import { AuthenticationError } from "apollo-server-cloud-functions";

import generateJWT from "../../JWT/generateJWT";
import createResolver from "../graphql/createResolver";
import getGitHubAccessToken from "./getGitHubAccessToken";

/**
 * Variables of `signInWithCode`.
 */
type Variables = {
  input: SignInWithCodeInput;
};

/**
 * Sign-in with GitHub with OAuth sign-in code.
 */
const signInWithCode = createResolver<string, Variables>(
  ({ args, context }) => {
    return getGitHubAccessToken(args.input.code)
      .then(generateJWT(context.req))
      .catch(() => {
        const message = "Couldn't authenticate with provided code.";
        return Promise.reject(new AuthenticationError(message));
      });
  }
);

const resolvers = {
  Mutation: {
    signInWithCode,
  },
};

export default resolvers;
