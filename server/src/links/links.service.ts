import { Injectable } from '@nestjs/common';
import { Link } from 'libs/db/Entitys/link.entity';
import { Crud } from 'src/utils/crud.utils';
import { DataSource } from 'typeorm';
interface Paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class LinksService {
  constructor(private dataSource: DataSource) {}
  CurdModel = new Crud(Link, this.dataSource);
  async findAll(query: Paging) {
    return await this.CurdModel.FindAll(query);
  }

  async create(body: Link) {
    return await this.CurdModel.create(body);
  }

  async updated(body: Link) {
    return await this.CurdModel.update(body);
  }

  async remove(id) {
    return await this.CurdModel.delete(id);
  }
}
