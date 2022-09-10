import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { AdminUser } from './Entitys/Adminuser.entity';
import { Blog } from './Entitys/blog.entity';
import { Link } from './Entitys/link.entity';
import { Tag } from './Entitys/tag.entity';
import { User } from './Entitys/user.entity';

const Entity = TypeOrmModule.forFeature([User, Tag, Blog, Link, AdminUser]);
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cjl20020206',
      database: 'demo',
      entities: [User, Tag, Blog, Link, AdminUser],
      synchronize: true,
    }),
    Entity,
    JwtModule.register({
      secret: 'chenjinglin1014',
    }),
  ],
  providers: [DbService],
  exports: [DbService, Entity, JwtModule],
})
export class DbModule {}
