import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import User from './entities/user.entity';
import UpdateUserDto from './dto/update-user.dto';
import UserService from './user.service';
import AuthGuard from 'src/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('all')
  async getAll(): Promise<User[] | null> {
    return this.userService.getAll();
  }

  @Get('healthzzzz')
  ping(): string {
    return 'Health OK';
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getOne({ id });
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne({ id }, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteOne({ id });
  }
}
