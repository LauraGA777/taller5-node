import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const CuentaAhorroSchema = new Schema({
    numeroCuenta: {
        type: Number,
        unique: true,
        required: true
    },
    documentoCliente: {
        type: Schema.Types.Number,
        ref: 'Cliente',
        required: true
    },
    fechaApertura: {
        type: Date,
        required: true,
        default: Date.now
    },
    saldo: {
        type: Number,
        required: true,
        default: 0
    },
    claveAcceso: {
        type: String,
        required: true
    }
});

// Hook para encriptar la clave de acceso antes de guardar
CuentaAhorroSchema.pre('save', async function (next) {
    if (!this.isModified('claveAcceso')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.claveAcceso, salt);
        this.claveAcceso = hash;
        next();
    } catch (error) {
        next(error);
    }
});

// Método estático para generar el número de cuenta autoincremental
CuentaAhorroSchema.statics.generateNumeroCuenta = async function () {
    const lastAccount = await this.findOne().sort({ numeroCuenta: -1 });
    return lastAccount ? lastAccount.numeroCuenta + 1 : 1;
};

export default model('CuentaAhorro', CuentaAhorroSchema);