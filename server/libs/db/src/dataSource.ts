import { DataSource } from 'typeorm';
import { AdminUser } from './Entitys/Adminuser.entity';
import { Blog } from './Entitys/blog.entity';
import { Link } from './Entitys/link.entity';
import { Tag } from './Entitys/tag.entity';
import { User } from './Entitys/user.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'cjl20020206',
  database: 'demo',
  entities: [AdminUser, User, Tag, Blog, Link],
});
dataSource
  .initialize()
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('error');
  });

export default dataSource;
