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
exports.TypeormService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const constants_1 = require("../config/constants");
let TypeormService = class TypeormService {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            type: 'mysql',
            host: this.configService.get(constants_1.DB_HOST),
            port: this.configService.get(constants_1.DB_PORT),
            username: this.configService.get(constants_1.DB_USERNAME),
            password: this.configService.get(constants_1.DB_PASSWORD),
            database: this.configService.get(constants_1.DB_DATABASE),
            entities: [__dirname + '/../**/*.entity{.js,.ts}'],
            synchronize: true,
            logging: true
        };
    }
};
exports.TypeormService = TypeormService;
exports.TypeormService = TypeormService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeormService);
//# sourceMappingURL=typeorm.service.js.map