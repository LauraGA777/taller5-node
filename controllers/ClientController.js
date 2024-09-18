import Cliente from "../models/Cliente.js";

// GET: Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET: Obtener mediante id
export const getClienteById = async (req, res) => {
    try {
        const clientes = await Cliente.findById(req.params.id);
        if (!clientes) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// POST: Crear un nuevo cliente
export const postCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        return res.status(201).json(cliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT: Actualizar un cliente

export const putCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE: Eliminar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}