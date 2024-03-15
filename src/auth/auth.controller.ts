import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/users.dto';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() data: CreateUserDto) {
    try {
      const user = await this.usersService.create(data);
      return user;
    } catch (e) {
      throw new BadRequestException('Bad Request', {
        cause: e,
        description: 'Some error description',
      });
    }
  }
}
