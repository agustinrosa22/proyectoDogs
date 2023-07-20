const { Router } = require('express');
const {  getDogById, getdogsHandler, postDogsHandler } = require('../handlers/dogsHandlers')
const { Alltemperaments } = require('../handlers/temperamentsHandler') 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs/', getdogsHandler)
router.get('/dogs/:id', getDogById);
router.post('/dogs/', postDogsHandler);
router.get('/temperaments',  Alltemperaments);

module.exports = router;
