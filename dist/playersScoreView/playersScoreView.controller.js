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
exports.PlayersScoreViewController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const playersScoreView_service_1 = require("./playersScoreView.service");
let PlayersScoreViewController = class PlayersScoreViewController {
    constructor(playersScoreViewService) {
        this.playersScoreViewService = playersScoreViewService;
    }
    get() {
        return this.playersScoreViewService.findAll()
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.PlayersScoreViewController = PlayersScoreViewController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersScoreViewController.prototype, "get", null);
exports.PlayersScoreViewController = PlayersScoreViewController = __decorate([
    (0, common_1.Controller)('playersview'),
    __metadata("design:paramtypes", [playersScoreView_service_1.PlayersScoreViewService])
], PlayersScoreViewController);
//# sourceMappingURL=playersScoreView.controller.js.map