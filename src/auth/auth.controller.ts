import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    async signup(@Body() body: RegisterDto, @Session() session: any) {
        const user = await this.authService.register(body as User)
        session.userId = user.id;
        return user;
    }

    @Post('/login')
    async signin(@Body() body: LoginDto, @Session() session: any) {
        const user = await this.authService.login(body.mobile, body.password)
        session.userId = user.id;        
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('/check')
    check(@CurrentUser() user: User) {        
        return user;
    }

    @Post('/logout')
    signout(@Session() session: any) {
        session.userId = null;
    }

}
