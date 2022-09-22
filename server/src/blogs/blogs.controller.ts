import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly BlogsService: BlogsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query) {
    return await this.BlogsService.findAll(query);
  }
  @Post()
  async create(@Body() body) {
    return await this.BlogsService.create(body);
  }
  @Post('update')
  async updated(@Body() body) {
    return await this.BlogsService.updated(body);
  }
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.BlogsService.remove(id);
  }
}
