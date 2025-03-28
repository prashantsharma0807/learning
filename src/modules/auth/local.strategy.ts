import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UsersService } from "../users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
// bcrypt is a CommonJS module. When you use import bcrypt from 'bcrypt', TypeScript expects a default export, but bcrypt doesn't have one.
// Using import * as bcrypt correctly imports all named exports, including hash, compare, etc.


@Injectable()
export class Localstrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({ usernameField: 'email' }); // Use 'email' instead of 'username' if applicable
    }

    async validate(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (user == undefined) {
            throw new UnauthorizedException();
        } 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return user;
        }else{
            throw new UnauthorizedException();
        }
    }

}