import User from 'src/user/entities/user.entity';

export const config = () => ({
  api: {
    origin: process.env.API_ORIGIN,
  },
  typeorm: {
    type: process.env.POSTGRES_TYPE,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    logging: false,
    entities: [User],
  },
  services: {
    authHost: {
      format: String,
      env: 'AUTH_SERVICE_SERVICE_HOST',
    },
    authPort: {
      format: String,
      env: 'AUTH_SERVICE_SERVICE_PORT',
    },
  },
});
