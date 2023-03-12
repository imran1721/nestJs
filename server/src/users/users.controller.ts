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
  CACHE_MANAGER,
  Inject,
  CacheTTL, 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { getQueryParam } from 'src/helpers/paramQuery';
import * as bcrypt from 'bcrypt';
import { User } from './model/user.model';
import { UsersService } from './users.service';
import * as dotenv from 'dotenv';
import {LogInDetails} from './dto/logInRequest';
import { ApiBearerAuth, ApiParam  } from '@nestjs/swagger';
import { PaginationParam } from './dto/paginationParam';
dotenv.config();

const EXPIRES_IN = process.env.EXPIRES_IN;
const CACHE_TTL = Number(process.env.CACHE_TTL);
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/login')
  async login(@Res() response, @Body() credential: LogInDetails): Promise<User> {
    {
      const { email, password } = credential;
      if (!email || !password)
        return response.status(HttpStatus.BAD_REQUEST).json('Email or Password missing!');
      const user = await this.usersService.getUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = await this.jwtService.signAsync({ id: user?.id });
        console.log(`Token: ${token}`);
        return response.status(HttpStatus.OK).json({
          username: user?.dataValues?.firstName,
          AccessToken: token,
          ExpiresIn: EXPIRES_IN,
        });
      } else {
        return response.status(HttpStatus.BAD_GATEWAY).json('Incorrect Email or Password!');
      }
    }
  }

  @CacheTTL(CACHE_TTL)
  @Get()
  @ApiBearerAuth('access-token')
  async getUsers(
    @Res() response,
    @Headers() headers,
    @Query() query: PaginationParam,
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
      const cachedUser = await this.cacheManager.get(cacheKey);
      if (cachedUser) return response.status(HttpStatus.OK).json(cachedUser);
      else {
        const formattedQueryParam = getQueryParam(query);
        const users = await this.usersService.findAll(formattedQueryParam);
        await this.cacheManager.set(cacheKey, users);
        return response.status(HttpStatus.OK).json(users);
      }
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
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        const result = await this.usersService.createUser(user);
        return response.status(HttpStatus.OK).json(result);
      } catch (err: any) {
        const errors = err?.errors?.map((error: Error) => error.message) || err;
        return response.status(HttpStatus.GATEWAY_TIMEOUT).json(errors || err);
      }
    }
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: `enter User's id`,
    required: true
})
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
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: `enter User's id`,
    required: true
})
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
      if (!userResult) return response.status(HttpStatus.BAD_REQUEST).json('User not found!');
      const count = await this.usersService.updateUserById(user, param);
      if (count)
        return response.status(HttpStatus.OK).json('user detail updated successfully!');
    } catch (err: any) {
      const errors = err.errors.map((error: Error) => error.message);
      return response
        .status(HttpStatus.BAD_GATEWAY)
        .json({ Errors: { errors } });
    }
  }

  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: `enter User's id`,
    required: true
})
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
      if (!user) return response.status(HttpStatus.BAD_REQUEST).json('User not found!');
      const count = await this.usersService.deleteUserById(param);
      if (count) return response.status(HttpStatus.OK).json('user deleted successfully!');
    } catch (err: any) {
      const errors = err.errors.map((error: Error) => error.message);
      return response.status(HttpStatus.BAD_REQUEST).json({ Errors: { errors } });
    }
  }
}
