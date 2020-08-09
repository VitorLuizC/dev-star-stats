import type { Request } from 'firebase-functions';
import { sign } from 'jsonwebtoken';
import ALGORITHM from './ALGORITHM';
import type JWTPayload from './JWTPayload';

const EXPIRES_IN = "2 days";

/**
 * A curry that generates authentication JWT.
 */
export default function generateJWT(request: Request) {
  return (token: string) => {
    const payload: JWTPayload = {
      token,
      ip: request.ip,
    };

    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: EXPIRES_IN,
      algorithm: ALGORITHM,
    });
  };
}
