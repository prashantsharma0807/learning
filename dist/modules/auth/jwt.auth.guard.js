"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super(...arguments);
        this.excludedRoutes = [
            { method: 'POST', path: '/users/create' },
            { method: 'POST', path: '/users/login' },
        ];
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        if (this.excludedRoutes.some(route => route.method === method && url.startsWith(route.path))) {
            return true;
        }
        const result = super.canActivate(context);
        if (result instanceof rxjs_1.Observable) {
            return (0, rxjs_2.firstValueFrom)(result);
        }
        return result;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt.auth.guard.js.map