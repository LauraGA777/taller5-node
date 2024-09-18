import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    nombreUsuario: {
        type: String,
        unique: true,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
        required: true
    }
})

// Hook que se ejecuta antes de guardar un usuario
UserSchema.pre('save', async function (next) {
    // Solo encriptar la contraseña si ha sido modificada o es nueva
    if (!this.isModified('contrasena')) {
        return next();
    }

    try {
        // Generar un salt y luego encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.contrasena, salt);
        this.contrasena = hash; // Reemplaza la contraseña con la encriptada
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
UserSchema.methods.compararContrasena = async function (password) {
    return await bcrypt.compare(password, this.contrasena);
};

export default model('Usuario', UserSchema)