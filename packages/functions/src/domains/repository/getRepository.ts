import requestGitHubGraphQL from "../../helpers/requestGitHubGraphQL";
import {
  GITHUB_REPOSITORY_FRAGMENT,
  GitHubRepository,
} from "./GitHubRepository";
import type Repository from "./Repository";
import { toUser } from "../user/GitHubUser";
import getStargazersByRepository from "./getStargazers";

type GitHubRepositoryEdge = {
  cursor: string;
  node: GitHubRepository;
};

type GitHubUserRepositoriesResult = {
  user: null | {
    repositories: null | {
      totalCount: number;
      edges: GitHubRepositoryEdge[];
    };
  };
};

const GITHUB_USER_REPOSITORIES_QUERY = /* GraphQL */ `
  ${GITHUB_REPOSITORY_FRAGMENT}

  query GITHUB_USER_REPOSITORIES_QUERY($cursor: String, $username: String!) {
    user(login: $username) {
      repositories(
        after: $cursor
        first: 100
        orderBy: { field: CREATED_AT, direction: ASC }
      ) {
        totalCount
        edges {
          cursor
          node {
            ...GITHUB_REPOSITORY_FRAGMENT
          }
        }
      }
    }
  }
`;

export default function getRepositoriesByUsername(token: string) {
  return (username: string) => {
    let edges: GitHubRepositoryEdge[] = [];
    let count = 0;

    const fetchMore = (): Promise<Repository[]> => {
      const variables = {
        username,
        cursor: edges[edges.length - 1]?.cursor ?? null,
      };

      return requestGitHubGraphQL(
        GITHUB_USER_REPOSITORIES_QUERY,
        variables,
        token
      )
        .then((result) => result.data as null | GitHubUserRepositoriesResult)
        .then((result) => {
          // Sorry
          count = result?.user?.repositories?.totalCount ?? 0;
          edges = edges.concat(result?.user?.repositories?.edges ?? []);
        })
        .then(() => {
          // Do another request.
          if (count > edges.length) return fetchMore();

          return Promise.all(
            edges.map(async (edge): Promise<Repository> => ({
              link: edge.node.url,
              name: edge.node.name,
              owner: toUser(edge.node.owner),
              description: edge.node.description || null,
              stargazers: await getStargazersByRepository(token)(edge.node),
            }))
          );
        });
    };

    return fetchMore();
  };
}
