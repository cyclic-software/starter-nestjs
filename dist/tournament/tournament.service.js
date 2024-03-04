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
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const tournament_entity_1 = require("./tournament.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TournamentService = class TournamentService {
    constructor(tornamentRepository) {
        this.tornamentRepository = tornamentRepository;
    }
    async findAll() {
        return await this.tornamentRepository.find();
    }
    async findById(id_tournament) {
        return await this.tornamentRepository.findOneBy({ id_tournament });
    }
    async create(nuevo) {
        return await this.tornamentRepository.save(nuevo);
    }
    async update(id_tournament, nuevo) {
        return await this.tornamentRepository.update(id_tournament, nuevo);
    }
    async delete(id_tournament) {
        await this.tornamentRepository.delete({ id_tournament });
        return 'ok';
    }
};
exports.TournamentService = TournamentService;
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.TournamentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TournamentService);
//# sourceMappingURL=tournament.service.js.map