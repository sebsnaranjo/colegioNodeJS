const mongoose = require("mongoose");

const estudianteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);