"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersScoreViewModule = void 0;
const common_1 = require("@nestjs/common");
const playersScoreView_controller_1 = require("./playersScoreView.controller");
const playersScoreView_service_1 = require("./playersScoreView.service");
const typeorm_1 = require("@nestjs/typeorm");
const playersScoreView_entity_1 = require("./playersScoreView.entity");
let PlayersScoreViewModule = class PlayersScoreViewModule {
};
exports.PlayersScoreViewModule = PlayersScoreViewModule;
exports.PlayersScoreViewModule = PlayersScoreViewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([playersScoreView_entity_1.PlayersScoreViewEntity])],
        controllers: [playersScoreView_controller_1.PlayersScoreViewController],
        providers: [playersScoreView_service_1.PlayersScoreViewService]
    })
], PlayersScoreViewModule);
//# sourceMappingURL=playersScoreView.module.js.map