import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export class DbConfig {
  static getConfig(): TypeOrmModuleOptions {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
      process.env;

    if (DB_HOST && DB_PORT && DB_USERNAME && DB_PASSWORD && DB_DATABASE) {
      return {
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        synchronize: false,
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['dist/src/migrations/*.js'],
      };
    } else {
      Logger.error('CONFIG ERROR: BAD ENVIRONMENT');
      process.exit();
    }
  }

  static getDatasource(): DataSourceOptions {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
      process.env;

    if (DB_HOST && DB_PORT && DB_USERNAME && DB_PASSWORD && DB_DATABASE) {
      return {
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        synchronize: false,
        migrationsRun: false,
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migrations/*.ts'],
      };
    } else {
      Logger.error('CONFIG ERROR: BAD ENVIRONMENT');
      process.exit();
    }
  }
}
