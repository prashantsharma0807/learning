"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const apiResponse_service_1 = require("../../utils/apiResponse.service");
const db_service_1 = require("../../utils/db.service");
const file_service_1 = require("../file/file.service");
const record_grpc_servie_1 = require("../../grpc/record.grpc.servie");
let UsersService = class UsersService {
    constructor(userRepository, fileService, recordGrpcService, dbService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.recordGrpcService = recordGrpcService;
        this.dbService = dbService;
    }
    async create(createUserDto, file) {
        if (createUserDto?.email) {
            const isUserExist = await this.findByUsername(createUserDto?.email);
            if (!isUserExist) {
                const filePath = await this.fileService.uploadFile(file);
                console.log(filePath, " filePath");
                const newcreateUser = await this.userRepository.create({
                    ...createUserDto,
                    image: filePath
                });
                const createUser = await this.userRepository.save(newcreateUser);
                return (0, apiResponse_service_1.ApiResponse)(201, "user register successfully", createUser);
            }
            else {
                return (0, apiResponse_service_1.ApiResponse)(403, "user already esist", isUserExist);
            }
        }
    }
    async findByUsername(email) {
        try {
            const query = `SELECT * FROM learning.users where email = '${email}' and deleted_at is null`;
            const user = await this.userRepository.query(query);
            return user[0];
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(params) {
        const page = params.page ? params.page || 1 : 1;
        const limit = params.perPage ? params.perPage || 10 : 10;
        const sortBy = params.sortBy || 'created_at';
        const sortOrder = params.sortOrder || 'desc';
        let whereCond = '';
        let query = '';
        if (params.q) {
            whereCond += `AND (user.first_name LIKE '%${params.q}%') OR user.last_name LIKE '%${params.q}%') OR user.email LIKE '%${params.q}%') `;
        }
        if (params.fromDate && params.toDate) {
            whereCond += `AND (user.created_at BETWEEN '${params.fromDate}' AND '${params.toDate}') `;
        }
        else if (params.fromDate) {
            whereCond += `AND (user.created_at >= '${params.fromDate}') `;
        }
        else if (params.toDate) {
            whereCond += `AND (user.created_at <= '${params.toDate}') `;
        }
        if (params.role) {
            whereCond += `AND user.role = '${params.role}' `;
        }
        query = `SELECT * FROM learning.users user where user.deleted_at is null ${whereCond}`;
        if (sortBy && sortOrder) {
            query += ` ORDER BY ${sortBy} ${sortOrder} `;
        }
        const docCnt = await this.userRepository.query(`select count(*) as totalCount from (${query}) as t`);
        query += ` LIMIT ${(page - 1) * limit}, ${limit}`;
        const result = await this.userRepository.query(query);
        const data = await this.dbService.getPaginationResponse({
            items: result,
            meta: {
                currentPage: page,
                totalItems: docCnt[0].totalCount,
                itemsPerPage: limit,
            },
        });
        return data;
    }
    async getAcademicRecordById(id) {
        try {
            const data = await this.recordGrpcService.getRecordById(id);
            console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService,
        record_grpc_servie_1.RecordGrpcService,
        db_service_1.DbService])
], UsersService);
//# sourceMappingURL=users.service.js.map