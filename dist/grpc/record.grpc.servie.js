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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordGrpcService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let RecordGrpcService = class RecordGrpcService {
    constructor() {
        this.client = new microservices_1.ClientGrpcProxy({
            url: 'localhost:5000',
            package: 'record',
            protoPath: 'src/proto/record.proto',
            maxReceiveMessageLength: 100 * 1024 * 1024,
            maxSendMessageLength: 100 * 1024 * 1024,
        });
        this.recordService = this.client.getService('RecordService');
    }
    async getRecordById(studentId) {
        console.log(studentId, " id");
        return this.recordService.GetStudentRecord({ studentId }).toPromise();
    }
};
exports.RecordGrpcService = RecordGrpcService;
exports.RecordGrpcService = RecordGrpcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RecordGrpcService);
//# sourceMappingURL=record.grpc.servie.js.map