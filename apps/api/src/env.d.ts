declare namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      ADMIN_CONSOLE_URL: string;
      JWT_SECRET: string;
    }
  }
  