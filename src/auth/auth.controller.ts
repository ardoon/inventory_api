import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dtos/auth.dto';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@ApiTags('Authentication')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    async signup(@Body() body: AuthDto, @Session() session: any) {
        const user = await this.authService.register(body as User)
        session.userId = user.id;
        return user;
    }

}
