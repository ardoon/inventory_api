import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findByMobile(mobile: string): Promise<User[]> {
        return this.usersRepository.findBy({ mobile });
    }

    findOne(id: number): Promise<User | null> {
        if(!id) {
            return null;
        }
        return this.usersRepository.findOneBy({ id });
    }

    async create(data: User): Promise<User> {

        // Check if mobile is duplicated
        const mobile = data.mobile;
        
        const users = await this.usersRepository.findBy({ mobile })
        if(users.length) {
            throw new BadRequestException(`There is a user with this mobile number!`)
        }

        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.usersRepository.findOneBy({id});

        if(!user) {
            throw new NotFoundException('User not found!');
        }

        Object.assign(user, attrs);
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOneBy({id});

        if(!user) {
            throw new NotFoundException('User not found!');
        }

        return this.usersRepository.remove(user);
    }

}
