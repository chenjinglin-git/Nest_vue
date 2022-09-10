import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
import { BadGatewayException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import dataSource from 'libs/db/dataSource';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'adminuser',
      passwordField: 'adminpass',
    } as IStrategyOptions);
  }
  async validate(username: string, password: string) {
    const data = await dataSource.manager
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('adminuser=:username', {
        username: username,
      })
      .addSelect('adminuser.adminpass')
      .getOne();
    if (!data) {
      throw new BadGatewayException('用户名或密码错误！');
    }
    if (!compareSync(password, data.adminpass)) {
      throw new BadGatewayException('用户名或密码错误！');
    }
    delete data.adminpass;
    return data;
  }
}
