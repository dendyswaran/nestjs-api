import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreatePostDto implements Prisma.postCreateInput {
  @ApiProperty()
  id?: string;

  @ApiProperty({
    required: true,
  })
  title: string;

  @ApiProperty({
    required: true,
    uniqueItems: true,
  })
  slug: string;

  createdAt?: string | Date;

  updatedAt?: string | Date;
}

export class UpdatePostDto implements Prisma.postUpdateInput {
  @ApiProperty({
    required: true,
  })
  title: string;

  @ApiProperty({
    required: true,
    uniqueItems: true,
  })
  slug: string;
}
