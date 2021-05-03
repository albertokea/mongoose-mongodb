const Persona = require('../models/Persona');

const router = require('express').Router();

router.get('/save', (req, res) => {
    //Insertar una nueva peroa a partir de una instancia de clase
    const pers = new Persona();
    pers.nombre = 'Rosita';
    pers.apellidos = 'Gómez';
    pers.email = 'rosita@mail.com';
    pers.edad = 34;
    pers.save()
        .then(doc => {
            res.json(doc);
        })
        .catch(error => console.log(error));
});

router.get('/create', async (req, res) => {
    const doc = await Persona.create({
        nombre: 'Luis',
        apellidos: 'Miguel',
        email: 'luismi@mail.com',
        edad: 210
    });
    res.json(doc);
})

router.get('/find', (req, res) => {
    Persona.find().then(docs => res.json(docs));
})

//Busqueda estricta
router.get('/find_v2', async (req, res) => {
    const docs = await Persona.find({ edad: 21 });
    res.json(docs);
})

//Filtro "includes"
router.get('/find_v3', async (req, res) => {
    const docs = await Persona.find({ edad: { $gt: 21, $lt: 50 } }); //edad > 21 y < 50
    res.json(docs);
})

module.exports = router;