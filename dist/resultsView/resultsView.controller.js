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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsViewController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const resultsView_service_1 = require("./resultsView.service");
let ResultsViewController = class ResultsViewController {
    constructor(resultsService) {
        this.resultsService = resultsService;
    }
    get() {
        return this.resultsService.findAll()
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    getByTournament(filter, id) {
        return this.resultsService.findByPK(filter, id)
            .then(res => {
            return res;
        })
            .catch(error => {
            throw new common_2.HttpException(error, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.ResultsViewController = ResultsViewController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResultsViewController.prototype, "get", null);
__decorate([
    (0, common_2.Get)('/:filter/:id'),
    __param(0, (0, common_1.Param)('filter')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ResultsViewController.prototype, "getByTournament", null);
exports.ResultsViewController = ResultsViewController = __decorate([
    (0, common_1.Controller)('resultsview'),
    __metadata("design:paramtypes", [resultsView_service_1.ResultsViewService])
], ResultsViewController);
//# sourceMappingURL=resultsView.controller.js.map