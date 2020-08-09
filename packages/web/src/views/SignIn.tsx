import React, { useEffect, useState } from "react";

/**
 * Component that renders sign-in. A view where users can sign-in with GitHub.
 */
export default function SignIn() {
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);
  const [signInURL, setSignInURL] = useState<null | string>();

  useEffect(() => {
    window
      .fetch("http://127.0.0.1:5001/dev-star-stats/us-central1/graphql", {
        body: JSON.stringify({
          query: /* GraphQL */ `
            query SIGN_IN_URL_QUERY {
              signInURL
            }
          `,
          variables: {},
        }),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setSignInURL(result.data.signInURL);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>
        ⭐ <code>dev-star-stats</code>
      </h1>
      {error ? (
        <p>Erro: {error.message}</p>
      ) : loading ? (
        <p>Carregando ...</p>
      ) : (
        <a href={signInURL ?? undefined}>Entrar com o GitHub</a>
      )}
    </main>
  );
}