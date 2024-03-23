"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TierlistModule = void 0;
const common_1 = require("@nestjs/common");
const tierlist_controller_1 = require("./tierlist.controller");
const tierlistt_service_1 = require("./tierlistt.service");
const typeorm_1 = require("@nestjs/typeorm");
const tierlist_entity_1 = require("./tierlist.entity");
let TierlistModule = class TierlistModule {
};
exports.TierlistModule = TierlistModule;
exports.TierlistModule = TierlistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tierlist_entity_1.TierlistEntity])],
        controllers: [tierlist_controller_1.TierlistController],
        providers: [tierlistt_service_1.TierlistService]
    })
], TierlistModule);
//# sourceMappingURL=tierlist.module.js.map