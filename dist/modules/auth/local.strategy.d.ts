import { UsersService } from "../users/users.service";
declare const Localstrategy_base: new (...args: any[]) => any;
export declare class Localstrategy extends Localstrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(username: string, password: string): Promise<any>;
}
export {};
