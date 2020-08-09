import React, { useEffect, useState } from "react";

/**
 * Component that renders callback.
 */
export default function Callback() {
  const [error, setError] = useState<null | Error>(null);
  const [, setToken] = useState<null | string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new window.URLSearchParams(window.location.search);

    window
      .fetch("http://127.0.0.1:5001/dev-star-stats/us-central1/graphql", {
        body: JSON.stringify({
          query: /* GraphQL */ `
            mutation SIGN_IN_WITH_CODE_MUTATION($code: String!) {
              signInWithCode(input: {
                code: $code
              })
            }
          `,
          variables: {
            code: params.get('code')
          },
        }),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((result) => {
        setToken(result.data.signInWithCode);
        window.localStorage.setItem('token', result.data.signInWithCode);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {error ? (
        <p>Erro: {error.message}</p>
      ) : loading ? (
        <p>Carregando ...</p>
      ) : (
        <p>Autenticado.</p>
      )}
    </main>
  );
}
