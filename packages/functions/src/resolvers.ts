const VERSION = process.env.VERSION ?? "NO_VERSION";

const resolvers = {
  Query: {
    version: () => VERSION,
  },
};

export default resolvers;
