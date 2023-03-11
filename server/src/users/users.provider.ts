import { USER_REPOSITORY } from '../helpers/constant';
import { User } from './model/user.model';

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User,
    },
];
