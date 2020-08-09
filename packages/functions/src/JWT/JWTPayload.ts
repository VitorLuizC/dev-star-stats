/**
 * JWT's payload.
 */
type JWTPayload = {
  /**
   * User IP.
   */
  ip: string;

  /**
   * GitHub access token.
   */
  token: string;
};

export default JWTPayload;
