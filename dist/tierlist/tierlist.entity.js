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
exports.TierlistEntity = void 0;
const constants_1 = require("../config/constants");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let TierlistEntity = class TierlistEntity {
};
exports.TierlistEntity = TierlistEntity;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TierlistEntity.prototype, "id_tierlist", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], TierlistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "int" }),
    __metadata("design:type", Number)
], TierlistEntity.prototype, "konami_id", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "enum", enum: ["Tier 0", "Tier 1", "Tier 2", "Tier 3"] }),
    __metadata("design:type", String)
], TierlistEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "enum", enum: constants_1.formats, default: constants_1.formats.DuelLinks }),
    __metadata("design:type", String)
], TierlistEntity.prototype, "format", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "varchar", length: 12 }),
    __metadata("design:type", String)
], TierlistEntity.prototype, "date", void 0);
exports.TierlistEntity = TierlistEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "tbl_tierlist_nrex"
    })
], TierlistEntity);
//# sourceMappingURL=tierlist.entity.js.map