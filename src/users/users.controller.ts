import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/helpers/passwordHash';
import { User } from './model/user.model';
import { UsersService } from './users.service';
// @ts-ignore
import storage from 'node-sessionstorage';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService
    ) {}

  @Get()
  getUsers(): any {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Res() response, @Body() user: User): Promise<User> {
    {try {
        console.log((user.password));
        // user.password = await hashPassword(user.password);
        
        const result = await this.usersService.createUser(user);
        return response.status(200).json(result);
      } catch (err: any) {
        const errors = err?.errors?.map((error: Error) => error.message) || err;
        return response.status(400).json({ err});
      }
    }
  }
  @Post('/login')
  async login(@Res() response, @Body() Credential: any): Promise<User> {
    {
      const { email, password } = Credential;
      if (!email || !password)
        return response.status(400).json('Email or Password missing!');
      const user = await this.usersService.getUserByEmail(email);
      console.log(password, user?.dataValues?.password);
      if (user && (password === user?.dataValues?.password)) {
        const token = await this.jwtService.signAsync({id:user?.id});
        console.log(`Token: ${token}`);
        console.log(this.jwtService.verifyAsync(token));
        return response
          .status(200)
          .json({ 
            AccessToken: token, ExpiresIn: "3600" 
        });
      } else {
        return response.status(401).json('Incorrect Email or Password!');
      }
    }
  }
}
