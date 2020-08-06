declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    GITHUB_CLIENT_ID: string;
    GITHUB_SECRET: string;
  }
}
