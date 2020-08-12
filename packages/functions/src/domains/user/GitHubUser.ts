import type User from "./User";

export type GitHubUser = {
  url: string;
  login: string;
  avatarUrl: string;
};

export const GITHUB_USER_FRAGMENT = /* GraphQL */ `
  fragment GITHUB_USER_FRAGMENT on Actor {
    url
    login
    avatarUrl
  }
`;

export function toUser(user: GitHubUser): User {
  return {
    link: user.url,
    username: user.login,
    avatarURL: user.avatarUrl
  }
}
