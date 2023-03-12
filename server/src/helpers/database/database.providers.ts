import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { databaseConfig } from './database.config';

export const databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async () => {
            const config: any=databaseConfig.development
            const sequelize = new Sequelize(config);
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
