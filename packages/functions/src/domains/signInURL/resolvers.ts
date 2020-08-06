import { stringify } from "querystring";

/**
 * Get the GitHub sign-in URL.
 */
const getSignInURL = () => {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: true,
  };

  return `https://github.com/login/oauth/authorize?${stringify(params)}`;
};

const resolvers = {
  Query: {
    signInURL: () => getSignInURL(),
  },
};

export default resolvers;
