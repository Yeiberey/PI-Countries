const { Router } = require('express');
//const { Op, Country } = require('../db.js');
const { getDBCountries, getDBCountry } = require('../controllers/getAllCountries.js')
const { getDBActivities, getDBActivity } = require('../controllers/getAllActivities.js')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const apiInfo = await getDBCountries()
        //console.log(Object.keys(apiInfo))
        res.status(200).json(apiInfo)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const country = await getDBCountry(id.toString().toUpperCase(), getDBActivities)
            console.log(country)
            if (country) res.status(200).json(country)
            else res.status(404).send(`the country ${id} does not exist`)

        } else {
            res.status(404).send("")
        }

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
router.get('',(req,res)=>{
    console.log(Object.keys(req.query))
    res.status(200).send('ok')
})

module.exports = router;