import type User from '../user/User';
import type Stargazer from './Stargazer';

type Repository = {
  link: string;
  name: string;
  owner: User;
  stargazers: Stargazer[];
  description: null | string;
};

export default Repository;
