declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    WEB_APPLICATION_URL: string;

    JWT_SECRET: string;
  }
}
