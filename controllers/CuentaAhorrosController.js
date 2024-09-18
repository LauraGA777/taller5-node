import CuentaAhorro from "../models/CuentaAhorros.js";
import Cliente from "../models/Cliente.js";
import bcrypt from 'bcrypt';

// GET: Listar los datos de una cuenta y poblar los datos del cliente
export const getCuentaAhorroByDocumento = async (req, res) => {
    try {
        const cuenta = await CuentaAhorro.findOne({ documentoCliente: req.params.id });
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });
        return res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// POST: Crear una cuenta
export const postCuentaAhorro = async (req, res) => {
    const { documentoCliente, claveAcceso, saldo } = req.body;
    try {
        const clienteExistente = await Cliente.findOne({ documentoCliente });
        if (!clienteExistente) return res.status(400).json({ message: 'Cliente no encontrado' });
        const numeroCuenta = await CuentaAhorro.generateNumeroCuenta();
        const cuenta = await CuentaAhorro.create({ documentoCliente, claveAcceso, saldo, numeroCuenta });
        return res.status(201).json(cuenta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT: Consignar dinero en la cuenta
export const consignarDinero = async (req, res) => {
    const { id, monto } = req.body;
    if (monto <= 0) return res.status(400).json({ message: 'Monto debe ser positivo' });

    try {
        const cuenta = await CuentaAhorro.findById(id);
        if (!cuenta) return res.status(404).json({ message: 'Not found' });

        cuenta.saldo += monto;
        await cuenta.save();
        return res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT: Retirar dinero de la cuenta
export const retirarDinero = async (req, res) => {
    const { id, monto } = req.body;
    if (monto <= 0) return res.status(400).json({ message: 'Monto debe ser positivo' });

    try {
        const cuenta = await CuentaAhorro.findById(id);
        if (!cuenta) return res.status(404).json({ message: 'Not found' });

        if (cuenta.saldo < monto) return res.status(400).json({ message: 'Saldo insuficiente' });

        cuenta.saldo -= monto;
        await cuenta.save();
        return res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE: Eliminar una cuenta
// DELETE: Eliminar una cuenta
export const deleteCuentaAhorro = async (req, res) => {
    try {
        const cuenta = await CuentaAhorro.findById(req.params.id);
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });

        if (cuenta.saldo !== 0) return res.status(400).json({ message: 'El saldo debe ser cero para eliminar la cuenta' });

        await CuentaAhorro.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Cuenta eliminada' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
