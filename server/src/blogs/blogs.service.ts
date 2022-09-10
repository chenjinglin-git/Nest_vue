import { Injectable } from '@nestjs/common';
import { Blog } from 'libs/db/Entitys/blog.entity';
import { Crud } from 'src/utils/crud.utils';
import { DataSource } from 'typeorm';
interface Paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class BlogsService {
  constructor(private dataSource: DataSource) {}
  CurdModel = new Crud(Blog, this.dataSource);
  async findAll(query: Paging) {
    return await this.CurdModel.FindAll(query, 'entity.tag');
  }

  async create(body: Blog) {
    return await this.CurdModel.create(body);
  }

  async updated(body: Blog) {
    return await this.CurdModel.update(body);
  }

  async remove(id) {
    return await this.CurdModel.delete(id);
  }
}
