import signInURLResolvers from "./domains/signInURL/resolvers";
import signInWithCodeResolvers from "./domains/signInWithCode/resolvers";
import userResolvers from "./domains/user/resolvers";
import repositoryResolvers from "./domains/repository/resolvers";

const resolvers = {
  Query: {
    _root: () => true,
    ...signInURLResolvers.Query,
    ...userResolvers.Query,
    ...repositoryResolvers.Query,
  },

  Mutation: {
    _root: () => true,
    ...signInWithCodeResolvers.Mutation,
  },
};

export default resolvers;
