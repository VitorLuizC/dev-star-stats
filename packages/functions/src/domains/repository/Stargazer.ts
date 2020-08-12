import type User from '../user/User';

type Stargazer = {
  user: User;
  starredAt: Date;
};

export default Stargazer;
