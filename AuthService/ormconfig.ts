import Credentials from 'src/credentials/entities/credentials.entity';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [Credentials],
  synchronize: true,
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
};

export = config;
