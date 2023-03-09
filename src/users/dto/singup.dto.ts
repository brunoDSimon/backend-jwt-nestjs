import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class SingUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;
}