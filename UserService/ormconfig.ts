import { ConnectionOptions } from 'typeorm';
import User from 'src/user/entities/user.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  url:
    process.env.POSTGRES_URL ||
    'postgres://postgres:postgres@postgres-user:5432/postgres-user?sslmode=disable',
  entities: [User],
  synchronize: true,
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
};

export = config;
