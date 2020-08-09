import type { Request } from 'firebase-functions';
import { verify } from 'jsonwebtoken';
import ALGORITHM from './ALGORITHM';

const PATTERN = /^Bearer (.+)$/;

export default function verifyJWT(req: Request) {
  const value = req.header("Authorization");

  // "Authorization" header shouldn't be empty.
  if (!value) return null;

  // "Authorization" header should match pattern.
  if (!PATTERN.test(value)) return null;

  const [, token] = PATTERN.exec(value)!;

  try {
    const payload = verify(token, process.env.JWT_SECRET, {
      algorithms: [ALGORITHM],
    });

    return payload;
  } catch {
    return null;
  }
}
