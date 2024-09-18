import express from "express";
import 'dotenv/config.js'
import connectDB from "../database/Config.js";
import routerClientes from "../routes/Clientes.routes.js";
import routerUsuarios from "../routes/Usuario.routes.js";
import routerCuentaAhorros from "../routes/CuentaAhorros.routes.js";
import cors from 'cors';  


export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.clientesPath = '/api/clientes';
        this.usuariosPath = '/api/usuarios';
        this.cuentaAhorroPath = '/api/cuentaAhorros';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        try {
            await connectDB();
        } catch (error) {
            console.error('Error connecting to database:', error);
        }
    }

    middlewares() {
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.clientesPath, routerClientes);
        this.app.use(this.usuariosPath, routerUsuarios);
        this.app.use(this.cuentaAhorroPath,routerCuentaAhorros);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    }
}
