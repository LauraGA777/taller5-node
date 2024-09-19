import Router from 'express';
import verificarToken  from '../middleware/auth.js';

const routerCuentaAhorros = Router()

import { getCuentasAhorro, getCuentaAhorroByDocumento, postCuentaAhorro, consignarDinero, retirarDinero ,deleteCuentaAhorro, } from '../controllers/CuentaAhorrosController.js'


routerCuentaAhorros.get('/', getCuentasAhorro)
routerCuentaAhorros.get('/:id', verificarToken ,getCuentaAhorroByDocumento)
routerCuentaAhorros.post('/', postCuentaAhorro)
routerCuentaAhorros.put('/consignar', verificarToken, consignarDinero)
routerCuentaAhorros.put('/retirar', verificarToken, retirarDinero)
routerCuentaAhorros.delete('/:id', verificarToken, deleteCuentaAhorro)

export default routerCuentaAhorros;
