import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    generateToken(user: any) {
        console.log(user, " user44")
        const payload = { email: user.email, sub: user.id, role: user.role, };
        return this.jwtService.sign(payload)
    }
}
