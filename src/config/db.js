import { env } from '@helpers/utils';

const environment = env('NODE_ENV');
const databaseURL = env('DATABASE_URL');
 
const dbOptions = dbURL => {
  const options = {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: env('DB_SSL', false)
    }
  };
  return dbURL ? options : {};
};

module.exports = {
  [environment]: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    logging: env('DB_LOGGING', false),
    ...dbOptions(databaseURL)
  },

  dbOptions
};
