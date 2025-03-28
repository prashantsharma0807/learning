import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class RoleGuard implements CanActivate {
    private rolePassed;
    constructor(role: string);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
