import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { USER_REPOSITORY } from 'src/helpers/constant';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private users: typeof User,
  ) {}

  async createUser(user): Promise<User> {
    return await this.users.create(user);
  }

  async findAll(queryParam): Promise<any> {
    return await this.users.findAll(queryParam);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.users.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User> {
    return await this.users.findOne({
      where: {
        id,
      },
    });
  }

  async updateUserById(user, id: number): Promise<[count: number]> {
    return await this.users.update(user, {
      where: {
        id,
      },
    });
  }

  async deleteUserById(id: number): Promise<Number> {
    return await this.users.destroy({
      where: {
        id,
      },
    });
  }
}
