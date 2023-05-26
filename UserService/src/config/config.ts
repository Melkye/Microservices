import User from 'src/user/entities/user.entity';

export const config = () => ({
  api: {
    origin: process.env.API_ORIGIN,
  },
  typeorm: {
    type: process.env.POSTGRES_TYPE || 'postgres',
    host: 'postgres-user',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_NAME || 'postgres-user',
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
