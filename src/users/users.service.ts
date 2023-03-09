import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './models/users.model';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { SingninDto } from './dto/singnin.dto';
@Injectable()
export class UsersService {

    constructor (
        @InjectModel('User')
        private readonly usersModel: Model<User>,
        private readonly AuthService: AuthService
    ) {

    }

    public async singUp(singUp: SingninDto): Promise<User> {
        const user = new this.usersModel(singUp);
        return user.save();
    }

    public async singnin(singninDto: SingninDto): Promise<{name: string, jwtToken: string, email: string}> {
        const user = await this.findByEmail(singninDto.email);
        const match = await this.checkPassword(singninDto.password, user);

        if(!match) {
            throw new NotFoundException('invalid credentials')
        }

        const jwtToken = await this.AuthService.createAcessToken(user._id);
        return {name: user.name, jwtToken: jwtToken, email: user.email}
    }


    public async findByEmail(email: string):Promise<User> {
        const user = await this.usersModel.findOne({email});

        if(!user) {
            throw new NotFoundException()
        }
        return user;
    }

    private async checkPassword(password: string, user: User): Promise<boolean> {
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            throw new NotFoundException('Password not found')
        }
        
        return match;

    }


    public async findAll(): Promise<User[]> {
        return this.usersModel.find();
    }
}
