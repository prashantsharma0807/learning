"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const program_controller_1 = require("./program.controller");
const program_detail_grpc_service_1 = require("./program-detail-grpc.service");
let ProgramModule = class ProgramModule {
};
exports.ProgramModule = ProgramModule;
exports.ProgramModule = ProgramModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "PROGRAM_DETAIL_PACKAGE",
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: 'localhost:50051',
                        maxReceiveMessageLength: 100 * 1024 * 1024,
                        maxSendMessageLength: 100 * 1024 * 1024,
                        package: "program_detail",
                        protoPath: (0, path_1.join)(__dirname, '../../proto/programdetail.proto'),
                    }
                }
            ])
        ],
        controllers: [program_controller_1.ProgramController],
        providers: [program_detail_grpc_service_1.ProgramDetailGrpcService]
    })
], ProgramModule);
//# sourceMappingURL=program.module.js.map