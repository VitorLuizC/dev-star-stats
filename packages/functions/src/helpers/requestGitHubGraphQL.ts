import fetch from "node-fetch";
import createRequest from "@bitty/create-request";
import type { JsonObject, JsonArray } from "@bitty/json";

type Fetch = Parameters<typeof createRequest>[0];

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

type GraphQLResult = {
  data: null | JsonObject;
  errors?: JsonArray;
};

const requestGitHubGraphQL = createRequest((fetch as unknown) as Fetch, {
  onRequest: (query: string, variables: JsonObject, token: string) => ({
    url: GITHUB_GRAPHQL_API,
    body: JSON.stringify({
      query,
      variables,
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }),

  onResponse: (response) => response.json() as Promise<GraphQLResult>,
});

export default requestGitHubGraphQL;
