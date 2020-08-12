import { GitHubUser, GITHUB_USER_FRAGMENT } from "../user/GitHubUser";

export type GitHubRepository = {
  url: string;
  name: string;
  description: null | string;
  owner: GitHubUser;
  stargazers: {
    totalCount: number;
    edges: {
      cursor: string;
      starredAt: Date;
      node: GitHubUser;
    }[];
  };
};

export const GITHUB_REPOSITORY_FRAGMENT = /* GraphQL */ `
  ${GITHUB_USER_FRAGMENT}

  fragment GITHUB_REPOSITORY_FRAGMENT on Repository {
    name
    description
    url
    owner { ...GITHUB_USER_FRAGMENT }
    stargazers (first: 100) {
      totalCount
      edges {
        cursor
        starredAt
        node { ...GITHUB_USER_FRAGMENT }
      }
    }
  }
`;
