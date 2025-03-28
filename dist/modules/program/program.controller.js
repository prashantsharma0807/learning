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
exports.ProgramController = void 0;
const common_1 = require("@nestjs/common");
const program_detail_grpc_service_1 = require("./program-detail-grpc.service");
const rxjs_1 = require("rxjs");
let ProgramController = class ProgramController {
    constructor(programDetailGrpcService) {
        this.programDetailGrpcService = programDetailGrpcService;
    }
    getProgram(pgmId) {
        try {
            const programDetail = this.programDetailGrpcService.getProgramDetail(pgmId);
            console.log(programDetail);
            return programDetail;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProgramController = ProgramController;
__decorate([
    (0, common_1.Get)('grpc/getprogram/:pgmId'),
    __param(0, (0, common_1.Param)('pgmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProgramController.prototype, "getProgram", null);
exports.ProgramController = ProgramController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [program_detail_grpc_service_1.ProgramDetailGrpcService])
], ProgramController);
//# sourceMappingURL=program.controller.js.map