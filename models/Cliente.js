import { model, Schema } from 'mongoose';

const ClientSchema = new Schema({
    documentoCliente: {
        type: Number,
        unique: true,
        required: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    celular: {
        type: Number
    },
    // "2023-09-14T12:34:56.789Z"
    fechaNacimiento: {
        type: Date,
        required: true
    }
})

export default model('Cliente', ClientSchema)