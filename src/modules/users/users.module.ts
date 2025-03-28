import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { DbService } from 'src/utils/db.service';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { RecordGrpcService } from 'src/grpc/record.grpc.servie';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule), //If both AuthModule and UsersModule depend on each other (e.g., UsersModule imports AuthModule and vice versa), use forwardRef() in both modules.
    FileModule,
    // ClientsModule.register([
    //   {
    //     name: 'RECORD_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //        url: 'localhost:5000',
    //        maxReceiveMessageLength: 100 * 1024 * 1024,
    //        maxSendMessageLength: 100 * 1024 * 1024,
    //        package: 'record',
    //        protoPath:'src/proto/record.proto', 
    //     },
    //   },
    // ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, DbService, RecordGrpcService],
  exports: [UsersService],
})
export class UsersModule { }

// ## If I want to use FileService function in UserService ==>> 
//  1.export FileService frome File Module and import File MOdule in User Module.
//  2.provide FileService in user moduile    providers: [FileService],
