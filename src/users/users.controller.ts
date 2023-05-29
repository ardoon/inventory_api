import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    @Get('/:id')
    getUser(
        @Param('id', ParseIntPipe) id: number
    ) {

    }

    @ApiQuery({
        name: "email",
        type: String,
        required: false
    })
    @Get()
    getUsers(
        @Query('email') email?: string
    ) {
        
    }

    @Post()
    createUser(
        @Body() body: CreateUserDto
    ) {

    }

    @Patch('/:id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto
    ) {

    }

    @Delete('/:id')
    removeUser(
        @Param('id', ParseIntPipe) id: number
    ) {

    }

}
