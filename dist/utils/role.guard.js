"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
class RoleGuard {
    constructor(role) {
        this.rolePassed = role;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        console.log(request.user);
        return request.user.role == "student";
    }
}
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map