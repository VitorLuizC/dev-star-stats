import createResolver from "../graphql/createResolver";
import getSignInURL from "./getSignInURL";

const resolvers = {
  Query: {
    signInURL: createResolver<string>(getSignInURL),
  },
};

export default resolvers;
