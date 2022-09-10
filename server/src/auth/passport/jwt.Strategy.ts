import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import dataSource from 'libs/db/dataSource';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chenjinglin1014',
    } as StrategyOptions);
  }
  async validate(id) {
    const data = await dataSource.manager
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('id=:id', {
        id: id,
      })
      .getOne();
    return data;
  }
}
