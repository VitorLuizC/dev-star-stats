import fetch from "node-fetch";

export const GITHUB_ACCESS_TOKEN_API = "https://github.com/login/oauth/access_token";

/**
 * Type that represents GitHub access token payload.
 */
export type GitHubAccessTokenPayload = {
  scope: string;
  token_type: "bearer";
  access_token: string;
};

/**
 * Does a POST request to GitHub access token API and return its payload.
 * @param code - A GitHub OAuth sign-in code.
 */
export default function getGitHubAccessToken(code: string): Promise<string> {
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
