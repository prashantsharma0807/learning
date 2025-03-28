import { Observable } from "rxjs";
export declare class RecordGrpcService {
    private client;
    private recordService;
    constructor();
    getRecordById(studentId: number): Promise<GetRecordResponse>;
}
export interface RecordService {
    GetStudentRecord(data: {
        studentId: number;
    }): Observable<GetRecordResponse>;
}
export interface GetRecordResponse {
    recordId: number;
    studentId: number;
    programId: string;
    result: string;
    grade: string;
}
