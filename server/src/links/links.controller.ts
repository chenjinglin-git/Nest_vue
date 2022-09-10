import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Link } from 'libs/db/Entitys/link.entity';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
  @Get()
  async findAll(@Query() query) {
    return await this.linksService.findAll(query);
  }
  @Post()
  async create(@Body() body) {
    return await this.linksService.create(body);
  }
  @Post('update')
  async updated(@Body() body) {
    return await this.linksService.updated(body);
  }
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.linksService.remove(id);
  }
}
