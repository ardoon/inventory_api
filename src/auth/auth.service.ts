import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async register(data: User) {

        // Hash and salting the password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(data.password, salt, 32)) as Buffer;
        const password = salt + '.' + hash.toString('hex');
        Object.assign(data, { password });

        // Store user
        return this.usersService.create(data);
    }

    async login(mobile: string, password: string) {

        const [user] = await this.usersService.findByMobile(mobile);

        if(!user) {
            throw new BadRequestException("Invalid Credentials!")
        }

        const [salt, storedHash] = user.password.split('.')
        const hash = ((await scrypt(password, salt, 32)) as Buffer).toString('hex');

        if (storedHash !== hash) {
            throw new BadRequestException("Invalid Credentials!");
        }

        return user;

    }

}
