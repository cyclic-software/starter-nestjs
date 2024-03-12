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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const results_entity_1 = require("./results.entity");
const typeorm_2 = require("typeorm");
let ResultsService = class ResultsService {
    constructor(tornamentRepository) {
        this.tornamentRepository = tornamentRepository;
    }
    async findAll() {
        return await this.tornamentRepository.find();
    }
    async findById(id_result) {
        return await this.tornamentRepository.findOneBy({ id_result });
    }
    async findByTournament(id_tournament_fk) {
        return await this.tornamentRepository.findBy({ id_tournament_fk });
    }
    async findByPlayer(id_player_fk) {
        return await this.tornamentRepository.findBy({ id_player_fk });
    }
    async create(nuevo) {
        return await this.tornamentRepository.save(nuevo);
    }
    async createBulk(nuevo) {
        return await this.tornamentRepository.save(nuevo);
    }
    async update(id_result, nuevo) {
        return await this.tornamentRepository.update(id_result, nuevo);
    }
    async delete(id_result) {
        await this.tornamentRepository.delete({ id_result });
        return 'ok';
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(results_entity_1.ResultsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResultsService);
//# sourceMappingURL=results.service.js.map