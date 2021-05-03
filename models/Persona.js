const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = new Schema({
    nombre: String,
    apellidos: String,
    email: String,
    edad: Number
})

personaSchema.virtual('nombre_completo').get(function () {
    return this.nombre + " " + this.apellidos;
})

//model tiene dos variables, primero nombre de la coleccion en singular y despues igual con schema
module.exports = mongoose.model('persona', personaSchema);