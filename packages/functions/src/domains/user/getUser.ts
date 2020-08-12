import requestGitHubGraphQL from "../../helpers/requestGitHubGraphQL";
import { GITHUB_USER_FRAGMENT, GitHubUser, toUser } from "./GitHubUser";
import type User from "./User";

type GitHubUserResult = {
  user: null | GitHubUser;
};

const GITHUB_USER_QUERY = /* GraphQL */ `
  ${GITHUB_USER_FRAGMENT}

  query GITHUB_USER_QUERY($username: String!) {
    user(login: $username) {
      ...GITHUB_USER_FRAGMENT
    }
  }
`;


export default function getUserByUsername(token: string) {
  return (username: string) => {
    const variables = {
      username,
    };

    return requestGitHubGraphQL(GITHUB_USER_QUERY, variables, token)
      .then((result) => result.data as null | GitHubUserResult)
      .then((result): null | User => {
        if (!result?.user) return null;
        return toUser(result.user);
      });
  };
}


