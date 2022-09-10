import { ApiresultService } from 'src/apiresult/apiresult.service';
import { DataSource } from 'typeorm';
interface Paging {
  search: any;
  limit: string;
  page: string;
}
export class Crud {
  constructor(private readonly Entity, private dataSource: DataSource) {}
  Apiresult = new ApiresultService();
  FindAll = async (query: Paging, join?: string) => {
    const search = query.search || '{}';
    const limit = Number(query.limit) || 10;
    const page = (Number(query.page) - 1) * limit || 0;
    let data;
    if (join) {
      data = await this.dataSource.manager
        .createQueryBuilder(this.Entity, 'entity')
        .leftJoinAndSelect(join, 'children')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    } else {
      data = await this.dataSource.manager
        .createQueryBuilder(this.Entity, 'entity')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    }
    const totals = await this.dataSource.manager
      .createQueryBuilder(this.Entity, 'entity')
      .where(JSON.parse(search))
      .getCount();
    const lastpage = Math.ceil(totals / limit);
    return {
      total: totals,
      data: data,
      lastpage: lastpage,
      page: page + 1,
    };
  };
  create = async (body: any) => {
    const data = await this.dataSource.manager
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values(body)
      .execute();
    if (data.raw.affectedRows > 0) {
      return this.Apiresult.MESSAGE(200, '创建成功', data);
    } else {
      return this.Apiresult.message(500, '插入失败请检查');
    }
  };
  update = async (body: any) => {
    const data = await this.dataSource.manager
      .createQueryBuilder()
      .update(this.Entity)
      .set(body)
      .where('id=:id', { id: body.id })
      .execute();
    if (data.affected > 0) {
      return this.Apiresult.message(200, '修改成功');
    } else {
      return this.Apiresult.message(500, '修改失败请检查');
    }
  };

  delete = async (id: string) => {
    const data = await this.dataSource.manager.findOneBy(this.Entity, {
      id: id,
    });
    if (data === null) {
      return this.Apiresult.message(500, '删除失败请检查参数');
    }
    this.dataSource.manager.remove(data);
    return this.Apiresult.message(200, '删除成功');
  };
}
