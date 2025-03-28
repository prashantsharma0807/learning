import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../entities/users.enums";

export class CreateUserDto {
    id: number;

    @IsNotEmpty()
    first_name: string;

    @IsOptional()
    last_name?: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: string;

    created_at!: Date;

    updated_at!: Date;
  
    deleted_at?: Date;
}


export class LoginDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}
