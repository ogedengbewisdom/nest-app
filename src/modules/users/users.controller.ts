import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '../../common/pipes/parse-int/parse-int.pipe';

// @Controller('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'users fetched successfully',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return {
      message: 'user fetched successfully',
      data: user,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub;
    const user = await this.usersService.remove(id, userId);

    return {
      message: 'user deleted successfully',
      data: user,
    };
  }
}
