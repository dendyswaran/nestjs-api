import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { GenericModule } from './generic/generic.module';

@Module({
  imports: [DbModule, PostModule, UsersModule, AuthModule, ArticleModule, GenericModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
