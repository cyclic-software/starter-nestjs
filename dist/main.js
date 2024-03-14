"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({
        origin: ["http://formato_nr.x10.mx"],
        methods: ["GET", "POST"],
        credentials: true
    });
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const port = process.env.SERVER_PORT;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
