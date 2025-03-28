import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProgramController } from './program.controller';
import { ProgramDetailGrpcService } from './program-detail-grpc.service';

@Module({
    imports :[
        ClientsModule.register([
            {
                name : "PROGRAM_DETAIL_PACKAGE",
                transport : Transport.GRPC,
                options : {
                    url : 'localhost:50051',
                    maxReceiveMessageLength: 100 * 1024 * 1024,
                    maxSendMessageLength: 100 * 1024 * 1024,
                    package : "program_detail",
                    protoPath : join(__dirname, '../../proto/programdetail.proto'),
                }
            }
        ])
    ],
    controllers: [ProgramController],
    providers :[ProgramDetailGrpcService]
})
export class ProgramModule {}
