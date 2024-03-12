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
exports.TournamentController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const tournament_service_1 = require("./tournament.service");
const tournament_entity_1 = require("./tournament.entity");
const roles_decorator_1 = require("../roles/roles.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../roles/roles.guard");
const role_enum_1 = require("../roles/role.enum");
let TournamentController = class TournamentController {
    constructor(tournamentService) {
        this.tournamentService = tournamentService;
    }
    get() {
        return this.tournamentService.findAll()
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    getbyID(id) {
        return this.tournamentService.findById(id)
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    save(nuevo) {
        return this.tournamentService.create(nuevo)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    update(id, arch) {
        return this.tournamentService.update(id, arch)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    delete(id) {
        return this.tournamentService.delete(id)
            .then(res => {
            return { sucess: true, data: res };
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.TournamentController = TournamentController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "get", null);
__decorate([
    (0, common_2.Get)('/:id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "getbyID", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tournament_entity_1.TournamentEntity]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "save", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Post)('/update/:id'),
    __param(0, (0, common_2.Param)("id")),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tournament_entity_1.TournamentEntity]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([role_enum_1.Role.ADMIN, role_enum_1.Role.GOD]),
    (0, common_2.Get)('/delete/:id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "delete", null);
exports.TournamentController = TournamentController = __decorate([
    (0, common_1.Controller)('tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentController);
//# sourceMappingURL=tournament.controller.js.map