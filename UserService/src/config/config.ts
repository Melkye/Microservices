import User from 'src/user/entities/user.entity';

export const config = () => ({
  api: {
    origin: process.env.API_ORIGIN,
  },
  typeorm: {
    type: process.env.POSTGRES_TYPE,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: false,
    entities: [User],
  },
  services: {
    authHost: {
      format: String,
      env: 'BOOKSHOP_AUTH_SERVICE_HOST',
    },
    authPort: {
      format: String,
      env: 'BOOKSHOP_AUTH_SERVICE_PORT',
    },
  },
});
