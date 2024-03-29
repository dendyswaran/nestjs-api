import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class PostService extends GenericService<
  'post',
  Prisma.postCreateInput,
  Prisma.postUpdateInput
> {
  constructor(db: DbService) {
    super(db, 'post');
  }
}
