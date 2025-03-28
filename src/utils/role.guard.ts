import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

export class RoleGuard implements CanActivate{

     private rolePassed :string;

     constructor(role:string){
        this.rolePassed = role;
     }

    canActivate(context: ExecutionContext): boolean | Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        console.log(request.user)
       // return this.rolePassed == request.user.role
       return request.user.role == "student"
    }

}