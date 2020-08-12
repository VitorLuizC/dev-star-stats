import createRequest from "@bitty/create-request";
import { getToken } from "./token";

const GRAPHQL_API =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5001/dev-star-stats/us-central1/graphql"
    : "https://us-central1-dev-star-stats.cloudfunctions.net/graphql";

const request = createRequest(window.fetch, {
  onRequest: (query: string, variables: any = {}) => {
    const token = getToken();
    return {
      url: GRAPHQL_API,
      body: JSON.stringify({
        query,
        variables,
      }),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    };
  },

  onResponse: (response) => response.json(),
});

export default request;
