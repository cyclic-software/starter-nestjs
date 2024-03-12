"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsViewModule = void 0;
const common_1 = require("@nestjs/common");
const resultsView_controller_1 = require("./resultsView.controller");
const resultsView_service_1 = require("./resultsView.service");
const typeorm_1 = require("@nestjs/typeorm");
const resultsView_entity_1 = require("./resultsView.entity");
let ResultsViewModule = class ResultsViewModule {
};
exports.ResultsViewModule = ResultsViewModule;
exports.ResultsViewModule = ResultsViewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([resultsView_entity_1.ResultsViewEntity])],
        controllers: [resultsView_controller_1.ResultsViewController],
        providers: [resultsView_service_1.ResultsViewService]
    })
], ResultsViewModule);
//# sourceMappingURL=resultsView.module.js.map