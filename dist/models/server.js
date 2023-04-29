"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        //Definir rutas
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo!!', this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    async dbConnection() {
        try {
            await connection_1.default.authenticate();
            console.log('Database online');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map