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
exports.ResultsViewEntity = void 0;
const constants_1 = require("../config/constants");
const typeorm_1 = require("typeorm");
let ResultsViewEntity = class ResultsViewEntity {
};
exports.ResultsViewEntity = ResultsViewEntity;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResultsViewEntity.prototype, "id_player", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResultsViewEntity.prototype, "id_tournament", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResultsViewEntity.prototype, "player_name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResultsViewEntity.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResultsViewEntity.prototype, "tournament_name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResultsViewEntity.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResultsViewEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResultsViewEntity.prototype, "format", void 0);
exports.ResultsViewEntity = ResultsViewEntity = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: "view_results_with_names",
        expression: `
    SELECT 
        p.id_player AS "id_player",
        t.id_tournament AS "id_tournament",
        p.name AS "player_name",
        p.picture AS "picture",
        t.name AS "tournament_name",
        r.place AS "place",
        r.points AS "points",
        r.format AS format
        
    FROM
        tbl_results_nrex r
    JOIN
        tbl_players_nrex p ON p.id_player = r.id_player_fk
    JOIN
        tbl_tournament_nrex t ON t.id_tournament = r.id_tournament_fk;
    `
    })
], ResultsViewEntity);
//# sourceMappingURL=resultsView.entity.js.map