import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class DbService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

//   async transactionConnectAndStart() {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     return queryRunner;
//   }

  getPaginationResponse(result: any): PaginationResponse {
    const { currentPage, totalItems, itemsPerPage } = result.meta;
    return {
      from: Number((currentPage - 1) * itemsPerPage) + 1,
      to:
        totalItems < currentPage * itemsPerPage
          ? Number(totalItems)
          : Number(currentPage * itemsPerPage),
      per_page: Number(itemsPerPage),
      current_page: Number(currentPage),
      last_page: Math.ceil(totalItems / itemsPerPage),
      total: Number(totalItems),
      content: result.items,
    };
  }

//   paginationParam(param: any) {
//     return {
//       sortBy: param.sortBy ? param.sortBy : 'created_at',
//       sortOrder: param.sortOrder ? param.sortOrder.toUpperCase() : 'ASC',
//       limit: param.perPage ? param.perPage : 10,
//       page: param.page ? param.page : 1,
//     };
//   }
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