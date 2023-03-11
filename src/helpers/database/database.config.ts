import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: "postgres",
        password: "12345",
        database: "postgres",
        host: "localhost",
        port: 5432,
        dialect: "postgres",
    },
};
