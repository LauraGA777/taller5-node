import Router from "express";

const routerUsuarios = Router();

import { getUsuarioById, postUsuario, putUsuario, deleteUsuario, accederAPI } from '../controllers/UserController.js'

const validarCamposAcceso = (req, res, next) => {
    const { nombreUsuario, contrasena } = req.body;
    if (!nombreUsuario || !contrasena) {
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
    }
    next();
};


routerUsuarios.get('/', (req, res) => {
    res.send('Hola desde la ruta de usuarios');
})
routerUsuarios.get('/:id', getUsuarioById)
routerUsuarios.post('/', postUsuario)
routerUsuarios.put('/:id', putUsuario)
routerUsuarios.delete('/:id', deleteUsuario)
routerUsuarios.post('/acceder', validarCamposAcceso, accederAPI) 

export default routerUsuarios;