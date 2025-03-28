"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./modules/auth/jwt.auth.guard");
const file_module_1 = require("./modules/file/file.module");
const program_module_1 = require("./modules/program/program.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => ({
                    type: 'mysql',
                    host: process.env['DB_HOST'],
                    port: 3306,
                    username: process.env['DB_USERNAME'],
                    password: process.env['DB_PASSWORD'],
                    database: process.env['DB_NAME'],
                    synchronize: false,
                    logging: false,
                    entities: ['dist/**/*.entity{.ts,.js}'],
                    migrations: ['dist/database/migrations/*{.ts,.js}'],
                    migrationsRun: true,
                    cli: {
                        entitiesDir: 'dist/',
                        migrationsDir: 'dist/database/migrations',
                    },
                })
            }),
            users_module_1.UsersModule, auth_module_1.AuthModule, file_module_1.FileModule, program_module_1.ProgramModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map