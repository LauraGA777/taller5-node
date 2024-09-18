import Router from 'express';

const routerClientes = Router()

import { getClienteById, postCliente, putCliente, deleteCliente } from '../controllers/ClientController.js'

routerClientes.get('/', (req, res) => {
    res.send('Hola desde la ruta de clientes');
})
routerClientes.get('/:id', getClienteById)
routerClientes.post('/', postCliente)
routerClientes.put('/:id', putCliente)
routerClientes.delete('/:id', deleteCliente)

export default routerClientes;