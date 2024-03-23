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
exports.PlayersScoreViewEntity = void 0;
const constants_1 = require("../config/constants");
const typeorm_1 = require("typeorm");
let PlayersScoreViewEntity = class PlayersScoreViewEntity {
};
exports.PlayersScoreViewEntity = PlayersScoreViewEntity;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], PlayersScoreViewEntity.prototype, "id_player", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PlayersScoreViewEntity.prototype, "player_name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PlayersScoreViewEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], PlayersScoreViewEntity.prototype, "total_points", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PlayersScoreViewEntity.prototype, "format", void 0);
exports.PlayersScoreViewEntity = PlayersScoreViewEntity = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: "view_players_with_score",
        expression: `
    SELECT 
    p.id_player AS id_player, 
    p.name AS player_name,
    p.picture AS picture,
    r.format as format,
    sum(r.points) AS total_points
    FROM
        tbl_players_nrex p
    JOIN
        tbl_results_nrex r 
    ON r.id_player_fk  = p.id_player
    GROUP BY p.id_player,r.format
    

    `
    })
], PlayersScoreViewEntity);
//# sourceMappingURL=playersScoreView.entity.js.map