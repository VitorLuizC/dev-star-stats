import React, { useEffect, useState } from "react";

import request from "../services/request";
import { persistToken } from "../services/token";

/**
 * Component that renders callback.
 */
export default function Callback() {
  const [error, setError] = useState<null | Error>(null);
  const [, setToken] = useState<null | string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new window.URLSearchParams(window.location.search);

    request(
      /* GraphQL */ `
        mutation SIGN_IN_WITH_CODE_MUTATION($code: String!) {
          signInWithCode(input: { code: $code })
        }
      `,
      { code: params.get("code") }
    )
      .then((result) => {
        setToken(result.data.signInWithCode);
        persistToken(result.data.signInWithCode);
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
