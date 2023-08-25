import { DataSource } from 'typeorm';
import { DbConfig } from './db.config';

export const AppDataSource = new DataSource(DbConfig.getDatasource());
