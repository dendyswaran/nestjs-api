import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PostService {
  constructor(readonly db: DbService) {}

  async create(createPostDto: Prisma.postCreateInput) {
    const result = await this.db.post.create({
      data: createPostDto,
    });
    return {
      result,
    };
  }

  async findAll() {
    return await this.db.post.findMany();
  }

  async findOne(id: string) {
    return await this.db.post.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePostDto: Prisma.postUpdateInput) {
    const result = await this.db.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        updatedAt: new Date(),
      },
    });
    return result;
  }

  async remove(id: string) {
    return await this.db.post.delete({ where: { id } });
  }
}
