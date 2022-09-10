import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
import { DataSource } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly datasourse: DataSource,
    private jwtservice: JwtService,
  ) {}
  @Post('register')
  async register(@Body() body: AdminUser) {
    body.adminpass = hashSync(body.adminpass);
    const data = await this.datasourse.manager
      .createQueryBuilder()
      .insert()
      .into(AdminUser)
      .values(body)
      .execute();
    if (data.raw.affectedRows > 0) {
      return {
        code: 200,
        msg: '注册成功',
      };
    } else {
      return {
        code: 500,
        msg: '注册失败',
      };
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    return {
      token: this.jwtservice.sign(String(req.user.id)),
    };
  }
  @Post('findone')
  @UseGuards(AuthGuard('jwt'))
  async findone(@Req() req) {
    return req.user;
  }
}
