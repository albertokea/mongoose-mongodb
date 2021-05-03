const router = require('express').Router();
const dayjs = require('dayjs');

const Producto = require('../../models/Producto');

router.get('/', (req, res) => {
    Producto.find()
        .then(productos => {
            /* const arrResultado = [];
            for (let producto of productos) {
                const productoCopia = { ...producto.toObject() };
                productoCopia.precio_iva = producto.precio_iva;
                arrResultado.push(productoCopia)
            } */
            const arrResultado = productos.map(producto => ({ ...producto.toObject(), precio_iva: producto.precio_iva }))
            res.json(arrResultado)
        })
        .catch(error => res.json({ error: error.message }));
})

router.get('/activos', async (req, res) => {
    const productos = await Producto.activos();
    res.json(productos);
})

router.post('/', (req, res) => {
    req.body.activo = false;
    req.body.fecha_insercion = dayjs();
    Producto.create(req.body)
        .then(producto => res.json(producto))
        .catch(error => res.json({ error: error.message }))
})

router.put('/:idProducto', (req, res) => {
    Producto.findByIdAndUpdate(req.params.idProducto, req.body, { new: true })
        .then(producto => res.json(producto))
        .catch(error => res.json({ error: error.message }));
})

router.delete('/:idProducto', (req, res) => {
    Producto.findByIdAndDelete(req.params.idProducto)
        .then(producto => res.json(producto))
        .catch(error => res.json({ error: error.message }));
})

module.exports = router;