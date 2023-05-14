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
import JwtAccessGuard from 'src/guards/jwt-access.guard';
import User from './entities/user.entity';
import UserService from './user.service';
import SignUpDto from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth/user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAccessGuard)
  @Get('all')
  async getAll(): Promise<User[] | null> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAccessGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getOne({ id });
  }

  @UseGuards(JwtAccessGuard)
  @Post()
  async create(@Body() body: SignUpDto): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAccessGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne({ id }, body);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteOne({ id });
  }
}
