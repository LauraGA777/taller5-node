import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// GET: Obtener mediante id
export const getUsuarioById = async (req, res) => {
    try {
        const usuarios = await Usuario.findById(req.params.id);
        if (!usuarios) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// POST: Crear un nuevo usuario
export const postUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT: Actualizar un usuario
export const putUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!usuario) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE: Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Not found' });
        return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// POST: Autenticar y acceder a la API

export const accederAPI = async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;

    if (!nombreUsuario || !contrasena) {
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
    }

    try {
        // Buscar usuario por nombre de usuario y estado
        const usuario = await Usuario.findOne({ nombreUsuario });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });

        // Verificar si el usuario está activo
        if (usuario.estado !== 'activo') {
            return res.status(403).json({ message: 'Usuario inactivo. No puede acceder.' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Generar un token JWT
        const token = jwt.sign({ id: usuario._id, nombreUsuario: usuario.nombreUsuario }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token válido por 1 hora
        });

        return res.status(200).json({ message: 'Acceso concedido', token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};