const KEY = "@dev-star-stats/token";

/**
 * Persists token in local storage.
 * @param token
 */
export function persistToken(token: string): void {
  window.localStorage.setItem(KEY, token);
}

export function getToken(): null | string {
  return window.localStorage.getItem(KEY);
}
