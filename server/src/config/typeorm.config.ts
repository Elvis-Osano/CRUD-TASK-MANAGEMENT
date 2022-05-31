import { User } from './../auth/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Task from 'src/tasks/tasks.entity';
import * as config from 'config';
type db = {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
};
const dbconfig: db = config.get('db');
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbconfig.type,
  host: process.env.RDS_HOSTNAME || dbconfig.host,
  port: +process.env.RDS_HOST || dbconfig.port,
  username: process.env.RDS_USERNAME || dbconfig.username,
  password: process.env.RDS_PASSWORD || dbconfig.password,
  database: process.env.RDS_DB_NAME || dbconfig.database,
  entities: [Task, User],
  synchronize: dbconfig.synchronize,
};
