import { ProgramDetailGrpcService } from './program-detail-grpc.service';
import { Observable } from 'rxjs';
export declare class ProgramController {
    private programDetailGrpcService;
    constructor(programDetailGrpcService: ProgramDetailGrpcService);
    getProgram(pgmId: string): Observable<any>;
}
