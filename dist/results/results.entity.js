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
exports.ResultsEntity = void 0;
const constants_1 = require("../config/constants");
const players_entity_1 = require("../players/players.entity");
const tournament_entity_1 = require("../tournament/tournament.entity");
const typeorm_1 = require("typeorm");
let ResultsEntity = class ResultsEntity {
};
exports.ResultsEntity = ResultsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResultsEntity.prototype, "id_result", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_player_fk' }),
    __metadata("design:type", Number)
], ResultsEntity.prototype, "id_player_fk", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_tournament_fk' }),
    __metadata("design:type", Number)
], ResultsEntity.prototype, "id_tournament_fk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: constants_1.formats, default: constants_1.formats.DuelLinks }),
    __metadata("design:type", String)
], ResultsEntity.prototype, "format", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ResultsEntity.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], ResultsEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => players_entity_1.PlayersEntity, (player) => player.results),
    (0, typeorm_1.JoinColumn)({ name: "id_player_fk", foreignKeyConstraintName: "tbl_results_fk_tbl_player_id_player" }),
    __metadata("design:type", players_entity_1.PlayersEntity)
], ResultsEntity.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tournament_entity_1.TournamentEntity, (tournament) => tournament.results),
    (0, typeorm_1.JoinColumn)({ name: "id_tournament_fk", foreignKeyConstraintName: "tbl_results_fk_tbl_tournament_id_tournament" }),
    __metadata("design:type", tournament_entity_1.TournamentEntity)
], ResultsEntity.prototype, "tournament", void 0);
exports.ResultsEntity = ResultsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "tbl_results_nrex"
    })
], ResultsEntity);
//# sourceMappingURL=results.entity.js.map