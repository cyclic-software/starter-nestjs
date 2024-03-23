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
exports.PlayersEntity = void 0;
const results_entity_1 = require("../results/results.entity");
const typeorm_1 = require("typeorm");
let PlayersEntity = class PlayersEntity {
};
exports.PlayersEntity = PlayersEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int" }),
    __metadata("design:type", Number)
], PlayersEntity.prototype, "id_player", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 32, type: "varchar" }),
    __metadata("design:type", String)
], PlayersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: "256" }),
    __metadata("design:type", String)
], PlayersEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => results_entity_1.ResultsEntity, (result) => result.player),
    __metadata("design:type", Array)
], PlayersEntity.prototype, "results", void 0);
exports.PlayersEntity = PlayersEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'tbl_players_nrex'
    })
], PlayersEntity);
//# sourceMappingURL=players.entity.js.map