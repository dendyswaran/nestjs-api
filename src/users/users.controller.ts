import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/profile')
  async updaterofile(@Request() req, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, data);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/remove')
  async remove(@Request() req) {
    const user = await this.usersService.remove(req.user.email);
    return user;
  }
}
