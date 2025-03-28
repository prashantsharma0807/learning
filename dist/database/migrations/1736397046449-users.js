"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1736397046449 = void 0;
class Users1736397046449 {
    constructor() {
        this.name = 'Users1736397046449';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`image\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
    }
}
exports.Users1736397046449 = Users1736397046449;
//# sourceMappingURL=1736397046449-users.js.map