import fetch from "node-fetch";

import type { SignInWithCodeInput } from "./typeDefs";
import { AuthenticationError } from "apollo-server-cloud-functions";
import generateJWT from "../../JWT/generateJWT";
import type { Request } from "firebase-functions";

const GITHUB_ACCESS_TOKEN_API = "https://github.com/login/oauth/access_token";

/**
 * Type that represents GitHub access token payload.
 */
type GitHubAccessTokenPayload = {
  scope: string;
  token_type: "bearer";
  access_token: string;
};

/**
 * Does a POST request to GitHub access token API and return its payload.
 * @param code - A GitHub OAuth sign-in code.
 */
function getAccessTokenByCode(code: string): Promise<string> {
  return fetch(GITHUB_ACCESS_TOKEN_API, {
    body: JSON.stringify({
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((payload: GitHubAccessTokenPayload) => payload.access_token);
}

/**
 * Variables of `signInWithCode`.
 */
type Variables = {
  input: SignInWithCodeInput;
};

/**
 * Sign-in with GitHub with OAuth sign-in code.
 * @param _ - The parent node is not really used in this resolver.
 * @param variables - An object with variables.
 */
function signInWithCode(
  _: unknown,
  variables: Variables,
  { req }: { req: Request }
): Promise<string> {
  return getAccessTokenByCode(variables.input.code)
    .then(generateJWT(req))
    .catch(() => {
      const message = "Couldn't authenticate with provided code.";
      return Promise.reject(new AuthenticationError(message));
    });
}

const resolvers = {
  Mutation: {
    signInWithCode,
  },
};

export default resolvers;
