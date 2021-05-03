const router = require('express').Router();
const dayjs = require('dayjs')

const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
    const productos = await Producto.find();
    res.render('productos/Lista', { productos });
});

router.get('/new', (req, res) => {
    res.render('productos/formulario')
});

router.get('/delete/:idProducto', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.idProducto); //Devuelve el objeto borrado
})

router.get('/edit/:idProducto', async (req, res) => {
    const producto = await Producto.findById(req.params.idProducto);
    res.render('productos/formularioEdit', { producto })
})

router.post('/create', async (req, res) => {
    req.body.activo = false;
    req.body.fecha_insercion = dayjs();
    await Producto.create(req.body);
    res.redirect('/productos')
});

router.post('/update', async (req, res) => {
    await Producto.findByIdAndUpdate(req.body._id, req.body);
    res.redirect('/productos')
})

module.exports = router;