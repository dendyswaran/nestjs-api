import { Module } from '@nestjs/common';
import { GenericService } from './generic.service';

@Module({
  exports: [GenericService],
  providers: [GenericService, String],
})
export class GenericModule {}
