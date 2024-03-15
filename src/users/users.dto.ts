import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.userCreateInput {
  id?: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty()
  roles: string[];
}

export class UpdateUserDto implements Prisma.userUpdateInput {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty()
  roles: string[];
}
