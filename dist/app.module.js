"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_service_1 = require("./typeorm/typeorm.service");
const tournament_module_1 = require("./tournament/tournament.module");
const config_1 = require("@nestjs/config");
const banlist_module_1 = require("./banlist/banlist.module");
const results_module_1 = require("./results/results.module");
const players_module_1 = require("./players/players.module");
const tierlist_module_1 = require("./tierlist/tierlist.module");
const resultsView_module_1 = require("./resultsView/resultsView.module");
const playersScoreView_module_1 = require("./playersScoreView/playersScoreView.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tournament_module_1.TournamentModule,
            banlist_module_1.BanlistModule,
            results_module_1.ResultsModule,
            players_module_1.PlayersModule,
            tierlist_module_1.TierlistModule,
            resultsView_module_1.ResultsViewModule,
            playersScoreView_module_1.PlayersScoreViewModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_service_1.TypeormService
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            typeorm_service_1.TypeormService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map