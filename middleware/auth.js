import jwt from 'jsonwebtoken';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Extraer el token del encabezado Authorization
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        console.log('Token recibido:', token);  // Log del token recibido
        console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Log del secreto JWT

        // Verificar y decodificar el token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verified;  // Almacena los datos del usuario verificados en la solicitud
        next();  // Continua al siguiente middleware o controlador
    } catch (error) {
        console.error('Error al verificar el token:', error);  // Log del error
        return res.status(400).json({ message: 'Token no válido' });
    }
};

export default verificarToken;