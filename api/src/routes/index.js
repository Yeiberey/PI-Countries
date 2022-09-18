const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require('../db.js')
const contriesMiddleware = require('../middlewares/countries');
const activitiesMiddleware = require('../middlewares/activities');
const { getDBCountryName } = require('../controllers/getAllCountries.js')


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.get('/countries', async (req, res,next) => {
    try {
        const {name, capital} = req.query
        if (name || capital) {
            const country = await getDBCountryName({name,capital})
            if (country.length) res.status(200).json(country)
            else res.status(404).send(`the ${name?'name':'capital'} country ${name?name:capital} does not exist`)

        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.use('/countries', contriesMiddleware);
router.use('/activities', activitiesMiddleware);


module.exports = router;
