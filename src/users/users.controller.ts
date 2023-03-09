import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SingUpDto } from './dto/singup.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './models/users.model';
import { SingninDto } from './dto/singnin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor (
        private readonly userService: UsersService,
    ) {

    }


    @Post('auth')
    @HttpCode(HttpStatus.CREATED)
    public async auth(@Body() body: SingninDto): Promise<{name: string, jwtToken: string, email: string}> {
        return this.userService.singnin(body);
    }


    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() body: SingUpDto): Promise<User> {
       return this.userService.singUp(body);
    }

    @Get()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    public async findAll() {
        return this.userService.findAll();
    }


}
