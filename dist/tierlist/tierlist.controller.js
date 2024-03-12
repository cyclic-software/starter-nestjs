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
exports.TierlistController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const tierlistt_service_1 = require("./tierlistt.service");
const tierlist_entity_1 = require("./tierlist.entity");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
const role_enum_1 = require("../roles/role.enum");
const roles_decorator_1 = require("../roles/roles.decorator");
let TierlistController = class TierlistController {
    constructor(tierlistService) {
        this.tierlistService = tierlistService;
    }
    get() {
        return this.tierlistService.findAll()
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    save(nuevo) {
        return this.tierlistService.create(nuevo)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    update(id, arch) {
        return this.tierlistService.update(id, arch)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    delete(id) {
        return this.tierlistService.delete(id)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.TierlistController = TierlistController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TierlistController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tierlist_entity_1.TierlistEntity]),
    __metadata("design:returntype", void 0)
], TierlistController.prototype, "save", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Post)('/update/:id'),
    __param(0, (0, common_2.Param)('id')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tierlist_entity_1.TierlistEntity]),
    __metadata("design:returntype", void 0)
], TierlistController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Get)('/delete/:id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TierlistController.prototype, "delete", null);
exports.TierlistController = TierlistController = __decorate([
    (0, common_1.Controller)('tierlist'),
    __metadata("design:paramtypes", [tierlistt_service_1.TierlistService])
], TierlistController);
//# sourceMappingURL=tierlist.controller.js.map