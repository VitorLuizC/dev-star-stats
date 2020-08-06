import signInURLResolvers from "./domains/signInURL/resolvers";

const VERSION = process.env.VERSION ?? "NO_VERSION";

const resolvers = {
  ...signInURLResolvers,
  Query: {
    version: () => VERSION,
    ...signInURLResolvers.Query,
  },
};

export default resolvers;
