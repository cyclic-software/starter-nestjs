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
exports.BanlistEntity = void 0;
const constants_1 = require("../config/constants");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let BanlistEntity = class BanlistEntity {
};
exports.BanlistEntity = BanlistEntity;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BanlistEntity.prototype, "id_ban", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], BanlistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: 'int' }),
    __metadata("design:type", String)
], BanlistEntity.prototype, "konami_id", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "enum", enum: ["forbidden", "limited", "semi-limited", "semi-released", "released"] }),
    __metadata("design:type", String)
], BanlistEntity.prototype, "limitation", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "enum", enum: constants_1.formats, default: constants_1.formats.DuelLinks }),
    __metadata("design:type", String)
], BanlistEntity.prototype, "format", void 0);
__decorate([
    (0, typeorm_2.Column)({ type: "varchar", length: 12 }),
    __metadata("design:type", String)
], BanlistEntity.prototype, "date", void 0);
exports.BanlistEntity = BanlistEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "tbl_banlist_nrex"
    })
], BanlistEntity);
//# sourceMappingURL=banlist.entity.js.map