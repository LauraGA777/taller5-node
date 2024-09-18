import Router from 'express';

const routerClientes = Router()

import { getClientes,getClienteById, postCliente, putCliente, deleteCliente } from '../controllers/ClientController.js'

routerClientes.get('/', getClientes)
routerClientes.get('/:id', getClienteById)
routerClientes.post('/', postCliente)
routerClientes.put('/:id', putCliente)
routerClientes.delete('/:id', deleteCliente)

export default routerClientes;