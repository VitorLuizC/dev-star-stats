import requestGitHubGraphQL from "../../helpers/requestGitHubGraphQL";
import { GITHUB_USER_FRAGMENT, GitHubUser, toUser } from "../user/GitHubUser";
import type { GitHubRepository } from "./GitHubRepository";
import type Stargazer from "./Stargazer";

type GitHubRepositoryStargazersVariables = {
  cursor: null | string;
  repositoryName: string;
  repositoryOwner: string;
};

type GitHubStargazerEdge = {
  node: GitHubUser;
  cursor: string;
  starredAt: Date;
};

function toStargazer(edge: GitHubStargazerEdge): Stargazer {
  return {
    user: toUser(edge.node),
    starredAt: new Date(edge.starredAt),
  };
}

type GitHubRepositoryStargazersResult = {
  repository: null | {
    stargazers: {
      totalCount: number;
      edges: GitHubStargazerEdge[];
    };
  };
};

const GITHUB_REPOSITORY_STARGAZERS_QUERY = /* GraphQL */ `
  ${GITHUB_USER_FRAGMENT}

  query GITHUB_REPOSITORY_STARGAZERS_QUERY(
    $cursor: String
    $repositoryName: String!
    $repositoryOwner: String!
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      stargazers(first: 100, after: $cursor) {
        totalCount
        edges {
          node {
            ...GITHUB_USER_FRAGMENT
          }
          cursor
          starredAt
        }
      }
    }
  }
`;

export default function getStargazersByRepository(token: string) {
  return (repository: GitHubRepository) => {
    let edges: GitHubStargazerEdge[] = repository.stargazers.edges ?? [];
    let count = repository.stargazers.totalCount ?? 0;

    const returnOrfetchMore = () => {
      if (count > edges.length) return fetchMore();
      return edges.map(toStargazer);
    }

    const fetchMore = (): Promise<Stargazer[]> => {
      const variables: GitHubRepositoryStargazersVariables = {
        cursor: edges[edges.length - 1]?.cursor ?? null,
        repositoryName: repository.name,
        repositoryOwner: repository.owner.login,
      };

      return requestGitHubGraphQL(
        GITHUB_REPOSITORY_STARGAZERS_QUERY,
        variables,
        token
      )
        .then(
          (result) => result.data as null | GitHubRepositoryStargazersResult
        )
        .then((result) => {
          // Mutations
          count = result?.repository?.stargazers.totalCount ?? 0;
          edges = edges.concat(result?.repository?.stargazers.edges ?? []);
        })
        .then(returnOrfetchMore);
    };

    return returnOrfetchMore();
  };
}
