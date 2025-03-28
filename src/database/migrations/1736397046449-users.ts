import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1736397046449 implements MigrationInterface {
    name = 'Users1736397046449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
    }

}
