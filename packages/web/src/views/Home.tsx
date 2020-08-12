import "c3/c3.css";

import React, { FormEvent, useMemo, useState } from "react";
import C3Chart from "react-c3js";

import useIsMounted from "../hooks/useIsMounted";
import request from "../services/request";

type Result = {
  data: null | {
    repositories: {
      stargazers: {
        starredAt: string;
      }[];
    }[];
  };
};

const REPOSITORIES_QUERY = /* GraphQL */ `
  query REPOSITORIES_QUERY($username: String!) {
    repositories(username: $username) {
      stargazers {
        starredAt
      }
    }
  }
`;

const getListOfStars = (username: string) => {
  return request(REPOSITORIES_QUERY, { username }).then((result: Result) => {
    const repositories = result.data?.repositories;

    if (!repositories) return [];

    return repositories.flatMap((repository) => {
      return repository.stargazers.map(
        (stargazer) => new Date(+stargazer.starredAt)
      );
    });
  });
};

/**
 * Component that renders a "homepage".
 */
export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState<Date[]>([]);

  const isMounted = useIsMounted();

  const columns = useMemo(
    () =>
      [...stars]
        .sort((dateA, dateB) => dateA.getTime() - dateB.getTime())
        .reduce<[[string, ...Date[]], [string, ...number[]]]>(
          ([dates, stars], date, index) => [
            [...dates, date] as [string, ...Date[]],
            [...stars, index] as [string, ...number[]],
          ],
          [["x"], ["stars"]]
        ),
    [stars]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);

    getListOfStars(username).then((stars) => {
      if (!isMounted()) return;
      setLoading(false);
      setStars(stars);
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">Nome do usuário</label>
          <input
            type="search"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </fieldset>
      </form>

      {loading && <p>Carregando...</p>}

      {stars.length > 0 && (
        <C3Chart
          data={{
            x: "x",
            xFormat: "%Y-%m-%dT%H:%M:%SZ",
            type: "spline",
            colors: { stars: "#fcd719" },
            columns: columns,
          }}
          axis={{
            x: {
              type: "timeseries",
              tick: {
                format: "%m/%Y",
              },
            },
          }}
        />
      )}
    </main>
  );
}
