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
exports.BanlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const banlist_entity_1 = require("./banlist.entity");
const typeorm_2 = require("typeorm");
let BanlistService = class BanlistService {
    constructor(banlistRepository) {
        this.banlistRepository = banlistRepository;
    }
    async findAll() {
        return await this.banlistRepository.find();
    }
    async findById(id_ban) {
        return await this.banlistRepository.findOneBy({ id_ban });
    }
    async create(nuevo) {
        return await this.banlistRepository.save(nuevo);
    }
    async update(id_ban, nuevo) {
        return await this.banlistRepository.update(id_ban, nuevo);
    }
    async delete(id_ban) {
        await this.banlistRepository.delete({ id_ban });
        return 'ok';
    }
};
exports.BanlistService = BanlistService;
exports.BanlistService = BanlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banlist_entity_1.BanlistEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BanlistService);
//# sourceMappingURL=banlist.service.js.map