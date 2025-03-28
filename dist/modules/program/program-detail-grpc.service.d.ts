import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
export declare class ProgramDetailGrpcService implements OnModuleInit {
    private readonly client;
    private programDetail;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    getProgramDetail(id: any): Observable<any>;
}
