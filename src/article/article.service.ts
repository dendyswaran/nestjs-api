import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { GenericService } from 'src/generic/generic.service';

@Injectable()
export class ArticleService extends GenericService<
  'article',
  Prisma.articleCreateInput,
  Prisma.articleUpdateInput
> {
  constructor(dbService: DbService) {
    super(dbService, 'article');
  }
}
