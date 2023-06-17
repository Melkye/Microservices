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

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async getAll(): Promise<User[] | null> {
    return this.userService.getAll();
  }

  @Get('healthzzzz')
  ping(): string {
    return 'Health OK';
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getOne({ id });
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne({ id }, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteOne({ id });
  }
}
