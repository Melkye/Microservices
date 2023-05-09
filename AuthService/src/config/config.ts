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
  jwt: {
    access_secret: {
      format: String,
      default: 'secret',
      env: 'JWT_SECRET_ACCESS',
    },
    refresh_secret: {
      format: String,
      default: 'refresh_secret',
      env: 'JWT_SECRET_REFRESH',
    },
    access_ttl: {
      format: Number,
      default: 600,
      env: 'ACCESS_TTL',
    },
    refresh_ttl: {
      format: Number,
      default: 604800,
      env: 'REFRESH_TTL',
    },
  },
  bcrypt: {
    salt_rounds: {
      format: Number,
      default: 10,
      env: 'BCRYPT_SALT_ROUNDS',
    },
  },
  redis: {
    host: {
      format: String,
      default: 'redis-auth',
      env: 'REDIS_HOST',
    },
    port: {
      format: Number,
      default: 6379,
      env: 'REDIS_PORT',
    },
    username: {
      format: String,
      default: 'redis',
      env: 'REDIS_USERNAME',
    },
    password: {
      format: String,
      default: 'redis',
      env: 'REDIS_PASSWORD',
    },
    url: {
      format: String,
      default: 'redis://redis@redis:6379/redis-auth?sslmode=disable',
      env: 'REDIS_URL',
    },
  },
});