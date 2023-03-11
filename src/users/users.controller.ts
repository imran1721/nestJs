import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Headers,
  Query,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';
import { getQueryParam } from 'src/helpers/paramQuery';
import { comparePassword, hashPassword } from 'src/helpers/passwordHash';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Res() response, @Body() Credential: any): Promise<User> {
    {
      const { email, password } = Credential;
      if (!email || !password)
        return response.status(400).json('Email or Password missing!');
      const user = await this.usersService.getUserByEmail(email);
      console.log(password, user?.dataValues?.password);
      if (user && password === user?.dataValues?.password) {
        const token = await this.jwtService.signAsync({ id: user?.id });
        console.log(`Token: ${token}`);
        return response.status(200).json({
          username: user?.dataValues?.firstName,
          AccessToken: token,
          ExpiresIn: '1d',
        });
      } else {
        return response.status(401).json('Incorrect Email or Password!');
      }
    }
  }

  @Get()
  async getUsers(
    @Res() response,
    @Headers() headers,
    @Query() query,
  ): Promise<User[]> {
    try {
      const cacheKey = 'allUsers';
      const token = headers.authorization?.replace('Bearer ', '');
      if (!token)
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json('Authentication Token missing!');
      try {
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json(`Unable to authorize access token!, Error: ${e}`);
      }
      // if (cache.has(cacheKey)) return res.status(200).json(cache.get(cacheKey));
      // else {
      const formattedQueryParam = getQueryParam(query);
      const users = await this.usersService.findAll(formattedQueryParam);
      // cache.set(cacheKey, users);
      return response.status(HttpStatus.OK).json(users);
      // }
    } catch (err: any) {
      const errors = err?.errors?.map((error: Error) => error.message) || err;
      return response
        .status(HttpStatus.GATEWAY_TIMEOUT)
        .json({ Errors: { errors } });
    }
  }

  @Post()
  async createUser(@Res() response, @Body() user: User): Promise<User> {
    {
      try {
        const result = await this.usersService.createUser(user);
        return response.status(HttpStatus.OK).json(result);
      } catch (err: any) {
        const errors = err?.errors?.map((error: Error) => error.message) || err;
        return response.status(HttpStatus.GATEWAY_TIMEOUT).json(errors || err);
      }
    }
  }

  @Get('/:id')
  async getUserById(
    @Res() response,
    @Param('id') param,
    @Headers() headers,
  ): Promise<User> {
    try {
      const token = headers.authorization?.replace('Bearer ', '');
      if (!token)
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json('Authentication Token missing!');
      try {
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json(`Unable to authorize access token!, Error: ${e}`);
      }
      const user = await this.usersService.getUserById(param);
      if (!user)
        return response.status(HttpStatus.NOT_FOUND).json('User not found!');
      return response.status(HttpStatus.OK).json(user);
    } catch (err: any) {
      const errors = err?.errors?.map((error: Error) => error.message) || err;
      return response.status(HttpStatus.GATEWAY_TIMEOUT).json({ err });
    }
  }

  @Put('/:id')
  async updateUserById(
    @Res() response,
    @Body() user: User,
    @Headers() headers,
    @Param('id') param,
  ): Promise<[]> {
    try {
      const token = headers.authorization?.replace('Bearer ', '');
      if (!token)
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json('Authentication Token missing!');
      try {
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json(`Unable to authorize access token!, Error: ${e}`);
      }
      const userResult = await this.usersService.getUserById(param);
      if (!userResult) return response.status(400).json('User not found!');
      const count = await this.usersService.updateUserById(user, param);
      if (count)
        return response.status(200).json('user detail updated successfully!');
    } catch (err: any) {
      const errors = err.errors.map((error: Error) => error.message);
      return response
        .status(HttpStatus.BAD_GATEWAY)
        .json({ Errors: { errors } });
    }
  }

  @Delete('/:id')
  async deleteUserById(
    @Res() response,
    @Param('id') param,
    @Headers() headers,
  ): Promise<[]> {
    try {
      const token = headers.authorization?.replace('Bearer ', '');
      if (!token)
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json('Authentication Token missing!');
      try {
        await this.jwtService.verifyAsync(token);
      } catch (e) {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json(`Unable to authorize access token!, Error: ${e}`);
      }
      const user = await this.usersService.getUserById(param);
      if (!user) return response.status(400).json('User not found!');
      const count = await this.usersService.deleteUserById(param);
      if (count) return response.status(200).json('user deleted successfully!');
    } catch (err: any) {
      const errors = err.errors.map((error: Error) => error.message);
      return response.status(400).json({ Errors: { errors } });
    }
  }
}
