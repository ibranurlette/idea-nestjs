/* eslint-disable @typescript-eslint/no-unused-vars */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const localConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'ideas',
  entities: ['dist/database/**/**/*.entity.js', 'dist/database/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

const productionConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/database/**/**/*.entity.js', 'dist/database/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export const ormConfig =
  process.env.NODE_ENV === 'development_local' ? localConfig : productionConfig;
