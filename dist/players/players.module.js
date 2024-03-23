"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersModule = void 0;
const common_1 = require("@nestjs/common");
const players_controller_1 = require("./players.controller");
const players_service_1 = require("./players.service");
const typeorm_1 = require("@nestjs/typeorm");
const players_entity_1 = require("./players.entity");
let PlayersModule = class PlayersModule {
};
exports.PlayersModule = PlayersModule;
exports.PlayersModule = PlayersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([players_entity_1.PlayersEntity])],
        controllers: [players_controller_1.PlayersController],
        providers: [players_service_1.PlayersService]
    })
], PlayersModule);
//# sourceMappingURL=players.module.js.map