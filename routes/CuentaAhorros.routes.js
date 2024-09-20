import Router from 'express';
import verificarToken  from '../middleware/auth.js';

const routerCuentaAhorros = Router()

import { getCuentasAhorro, getCuentaAhorroByDocumento, postCuentaAhorro, consignarDinero, retirarDinero ,deleteCuentaAhorro, } from '../controllers/CuentaAhorrosController.js'


routerCuentaAhorros.get('/', getCuentasAhorro)
routerCuentaAhorros.get('/:id', getCuentaAhorroByDocumento)
routerCuentaAhorros.post('/', postCuentaAhorro)
routerCuentaAhorros.put('/consignar', consignarDinero)
routerCuentaAhorros.put('/retirar', retirarDinero)
routerCuentaAhorros.delete('/:id',deleteCuentaAhorro)

export default routerCuentaAhorros;
