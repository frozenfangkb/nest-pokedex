export const EnvConfig = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
});
