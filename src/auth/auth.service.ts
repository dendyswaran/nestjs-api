import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as Crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const passHash = Crypto.createHash('sha256').update(pass).digest('hex');
    if (user && user.password === passHash) {
      return user;
    }
    return null;
  }

  async login(user: Prisma.userSelect) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
