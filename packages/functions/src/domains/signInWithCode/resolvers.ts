import JWT from "jsonwebtoken";
import fetch from "node-fetch";

import type { SignInWithCodeInput } from "./typeDefs";
import { AuthenticationError } from "apollo-server-cloud-functions";

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
function getAccessTokenByCode(code: string): Promise<GitHubAccessTokenPayload> {
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
  }).then((response) => response.json());
}

/**
 * Generates authentication JWT.
 * @param payload - Payload of GitHub access token.
 */
const generateAuthenticationJWT = (payload: GitHubAccessTokenPayload) =>
  JWT.sign({ token: payload.access_token }, process.env.JWT_SECRET, {
    expiresIn: "2 days",
    algorithm: "HS256",
  });

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
function signInWithCode(_: unknown, variables: Variables): Promise<string> {
  return getAccessTokenByCode(variables.input.code)
    .then(generateAuthenticationJWT)
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
