import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get('/:id')
    async getUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        const user = await this.usersService.findOne(id);

        if(!user) {
            throw new NotFoundException('User not exists!')
        }

        return user;
    }

    @ApiQuery({
        name: "mobile",
        type: String,
        required: false
    })
    @Get()
    getUsers(
        @Query('mobile') mobile?: string
    ) {
        if(!mobile) {
            return this.usersService.findAll();
        }
        return this.usersService.findByMobile(mobile);
    }

    @Post()
    createUser(
        @Body() body: CreateUserDto
    ) {
        return this.usersService.create(body as User);
    }

    @Patch('/:id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto
    ) {
        return this.usersService.update(id, body);
    }

    @Delete('/:id')
    removeUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.usersService.remove(id);
    }

}
