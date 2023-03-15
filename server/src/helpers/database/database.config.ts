import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "12345",
        database: process.env.DB_NAME || "postgres",
        host: process.env.HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DIALECT || "postgres",
    },
};
