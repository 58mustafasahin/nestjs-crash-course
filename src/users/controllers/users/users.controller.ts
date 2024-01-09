import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '@app/users/dtos/CreateUser.dto';
import { UsersService } from '@app/users/services/users/users.service';
import { ValidateCreateUserPipe } from '@app/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from '@app/users/guards/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
