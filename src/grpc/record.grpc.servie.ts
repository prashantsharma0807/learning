import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc, ClientGrpcProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

// @Injectable()
// export class RecordGrpcService implements OnModuleInit {
//     private recordService: RecordService;

//     constructor(@Inject('RECORD_PACKAGE') private readonly client: ClientGrpc) { }

//     onModuleInit() {
//         this.recordService = this.client.getService<RecordService>('RecordService')
//     }

//     async getRecordById(id: number): Promise<GetRecordResponse> {
//         console.log(id," id")
//         return this.recordService.GetRecordById({ id }).toPromise();

//     }
// }
// comment

@Injectable()
export class RecordGrpcService{

    private client : ClientGrpcProxy;
    private recordService: RecordService;

    constructor(){
        this.client = new ClientGrpcProxy({
            url :'localhost:5000',
            package : 'record',
            protoPath : 'src/proto/record.proto',
            maxReceiveMessageLength: 100 * 1024 * 1024,
            maxSendMessageLength: 100 * 1024 * 1024,
        })
        this.recordService = this.client.getService<RecordService>('RecordService');
    }

    async getRecordById(studentId: number): Promise<GetRecordResponse> {
                 console.log(studentId," id")
                 return this.recordService.GetStudentRecord({ studentId }).toPromise();
        
             }
}


export interface RecordService {
    GetStudentRecord(data: { studentId: number }): Observable<GetRecordResponse>

}

export interface GetRecordResponse {
    recordId : number;
    studentId : number;
    programId : string;
    result : string;
    grade : string;
}

