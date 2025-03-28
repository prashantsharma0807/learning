import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class ProgramDetailGrpcService implements OnModuleInit{
     private programDetail : ProgramDetail;

    constructor(@Inject('PROGRAM_DETAIL_PACKAGE') private readonly client :ClientGrpc){}

    onModuleInit() {
        this.programDetail = this.client.getService<ProgramDetail>('ProgramDetail')
    }

    getProgramDetail(id :any):Observable<any>{
      return this.programDetail.getProgramDetail({pgmId : id})
    }
}

interface ProgramDetail{
    getProgramDetail(ProgramDetailRequest :ProgramDetailRequest): Observable<any>
}

interface ProgramDetailRequest{
    pgmId :string;
}