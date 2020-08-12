import type * as functions from "firebase-functions";
import type JWTPayload from "../../JWT/JWTPayload";

interface IContext {
  req: functions.Request;
  res: functions.Response;
  user: null | JWTPayload;
};

export default IContext;
