import { Injectable } from '@nestjs/common';
import { ApiresultService } from 'src/apiresult/apiresult.service';
import { Tag } from 'libs/db/Entitys/tag.entity';
import { DataSource } from 'typeorm';
import { Crud } from 'src/utils/crud.utils';
interface Paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class TagsService {
  constructor(private dataSource: DataSource) {}
  CurdModel = new Crud(Tag, this.dataSource);
  async findAll(query: Paging) {
    return await this.CurdModel.FindAll(query, 'entity.superiors');
  }

  async create(body: Tag) {
    return await this.CurdModel.create(body);
  }

  async updated(body: Tag) {
    return await this.CurdModel.update(body);
  }

  async remove(id) {
    await this.dataSource
      .createQueryBuilder()
      .update(Tag)
      .set({ superiorsid: null })
      .where('superiorsid=:id', { id: id })
      .execute();
    return await this.CurdModel.delete(id);
  }
}
