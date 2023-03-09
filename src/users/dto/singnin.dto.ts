import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class SingninDto {
   
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}