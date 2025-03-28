import { DataSource } from "typeorm";
export declare class DbService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getPaginationResponse(result: any): PaginationResponse;
}
export interface PaginationResponse {
    from: number;
    to: number;
    per_page: number;
    current_page: number;
    last_page: number;
    total: number;
    content: any;
}
