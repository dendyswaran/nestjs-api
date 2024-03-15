import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GenericService<
  Model extends Prisma.ModelName,
  CreateDto,
  UpdateDto,
> {
  protected dbService: DbService;
  protected model: Model;

  constructor(private db: DbService, private modelName: Model) {
    this.dbService = db;
    this.model = modelName;
  }

  async create(data: CreateDto): Promise<Model> {
    return (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).create({
      data,
    });
  }

  async findAll(): Promise<Model[]> {
    return (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).findMany();
  }

  async findOne(id: string): Promise<Model | null> {
    return (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateDto): Promise<Model> {
    return (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Model> {
    return (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).delete({
      where: { id },
    });
  }

  async paginate(
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortOrder = 'asc',
  ): Promise<{
    data: Model[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const total = await (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).count();
    const data = await (
      this.dbService[this.model as keyof typeof this.dbService] as any
    ).findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      total,
      totalPages,
      page,
      limit,
    };
  }
}
