import { Controller, Get, Param } from '@nestjs/common';
import { ProgramDetailGrpcService } from './program-detail-grpc.service';
import { Observable } from 'rxjs';

@Controller()
export class ProgramController {
    constructor(private programDetailGrpcService : ProgramDetailGrpcService){}


    @Get('grpc/getprogram/:pgmId')
    getProgram(@Param('pgmId') pgmId: string):Observable<any>{
        try{
        const programDetail = this.programDetailGrpcService.getProgramDetail(pgmId);
        console.log(programDetail);
        return programDetail;
        }catch(error){
            throw error;
        }
    }
}
