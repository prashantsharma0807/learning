import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { Localstrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [PassportModule, forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env['JWT_SECRET']  || 'secret',
      signOptions: { expiresIn: '1h' },
  
    })
  ],  
  controllers: [AuthController],
  providers: [AuthService, Localstrategy, JwtStrategy],
  exports :[AuthService]
})
export class AuthModule {}
