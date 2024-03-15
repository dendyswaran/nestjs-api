import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as Crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(readonly db: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.db.user.create({
      data: {
        ...createUserDto,
        password: Crypto.createHash('sha256')
          .update(createUserDto.password)
          .digest('hex'),
      },
    });
    return result;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const result = await this.db.user.update({
      where: { id },
      data: updateDto,
    });
    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.db.user.findFirst({
      where: { email },
    });
    return result;
  }

  async remove(email: string) {
    return await this.db.user.delete({
      where: { email },
    });
  }
}
