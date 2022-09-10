import { Module } from '@nestjs/common';
import { DbModule } from 'libs/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiresultModule } from './apiresult/apiresult.module';
import { TagsModule } from './tags/tags.module';
import { BlogsModule } from './blogs/blogs.module';
import { MulterModule } from '@nestjs/platform-express';
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    DbModule,
    TagsModule,
    ApiresultModule,
    BlogsModule,
    MulterModule.register({
      storage: MAO({
        config: {
          region: 'oss-cn-hangzhou',
          accessKeyId: 'LTAI5tE9U1tczqa9r8CJ8VW2',
          accessKeySecret: 'byCt73QH06ZUaZ0HSSulI4exkVXRCK',
          bucket: 'cain-test',
        },
      }),
    }),
    LinksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
