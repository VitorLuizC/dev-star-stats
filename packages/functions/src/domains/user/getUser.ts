import requestGitHubGraphQL from "../../helpers/requestGitHubGraphQL";

export const GITHUB_USER_FRAGMENT = /* GraphQL */ `
  fragment GITHUB_USER_FRAGMENT on Actor {
    url
    login
    avatarUrl
  }
`;

const GITHUB_USER_QUERY = /* GraphQL */ `
  ${GITHUB_USER_FRAGMENT}

  query GITHUB_USER_QUERY($username: String!) {
    user(login: $username) {
      ...GITHUB_USER_FRAGMENT
    }
  }
`;

export type GitHubUser = {
  url: string;
  login: string;
  avatarUrl: string;
};

type GitHubUserResult = {
  user: null | GitHubUser;
};

export default function getUserByUsername(token: string) {
  return (username: string) => {
    const variables = {
      username,
    };

    return requestGitHubGraphQL(GITHUB_USER_QUERY, variables, token)
      .then((result) => result.data as null | GitHubUserResult)
      .then((result) => {
        if (!result?.user) return null;

        return {
          link: result.user.url,
          username: result.user.login,
          avatarURL: result.user.avatarUrl,
        };
      });
  };
}
