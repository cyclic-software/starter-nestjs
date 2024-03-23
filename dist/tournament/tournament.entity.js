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
exports.TournamentEntity = void 0;
const constants_1 = require("../config/constants");
const results_entity_1 = require("../results/results.entity");
const typeorm_1 = require("typeorm");
let TournamentEntity = class TournamentEntity {
};
exports.TournamentEntity = TournamentEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], TournamentEntity.prototype, "id_tournament", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: "256" }),
    __metadata("design:type", String)
], TournamentEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], TournamentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 124 }),
    __metadata("design:type", String)
], TournamentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], TournamentEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: constants_1.formats, default: constants_1.formats.DuelLinks }),
    __metadata("design:type", String)
], TournamentEntity.prototype, "format", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => results_entity_1.ResultsEntity, (results) => results.tournament),
    __metadata("design:type", Array)
], TournamentEntity.prototype, "results", void 0);
exports.TournamentEntity = TournamentEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "tbl_tournament_nrex"
    })
], TournamentEntity);
//# sourceMappingURL=tournament.entity.js.map