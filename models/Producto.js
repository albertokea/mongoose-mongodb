const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    departamento: String,
    activo: Boolean,
    imagen: String,
    fecha_insercion: Date
});

productoSchema.virtual('precio_iva').get(function () {
    return this.precio + (this.precio * 0.15)
})

productoSchema.statics.activos = function () {
    this.model('producto').find({ activo: true });
}

module.exports = mongoose.model('producto', productoSchema)

