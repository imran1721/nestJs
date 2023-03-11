import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { USER_REPOSITORY } from 'src/helpers/constant';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private users: typeof User,
  ){}

  async createUser(user): Promise<User> {
    return await this.users.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.users.findAll();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await User.findOne({ where: { email } });
  }

  // findOne(id: string): Promise<User> {
  //     return this.userModel.findOne({
  //         where: {
  //             id,
  //         },
  //     });
  // }
}
