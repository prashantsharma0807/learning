import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Users1733899426470 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
