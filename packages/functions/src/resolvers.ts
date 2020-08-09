import signInURLResolvers from "./domains/signInURL/resolvers";
import signInWithCodeResolvers from "./domains/signInWithCode/resolvers";

const resolvers = {
  Query: {
    _root: () => true,
    ...signInURLResolvers.Query,
  },

  Mutation: {
    _root: () => true,
    ...signInWithCodeResolvers.Mutation,
  },
};

export default resolvers;
