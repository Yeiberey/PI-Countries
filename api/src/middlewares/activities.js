const { Router } = require('express');
const bodyParser = require('body-parser')
const { getDBCountry } = require('../controllers/getAllCountries')
const { getDBActivities, getDBActivityName } = require('../controllers/getAllActivities.js')
const { Activity, Country } = require('../db.js');
const router = Router();

router.use(bodyParser.json())

router.get('/', async (req, res) => {
    try {
        const activities = await getDBActivities()
        res.status(200).json(activities)

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries_id } = req.body
    if (name && countries_id && typeof countries_id === "object") {
        try {
            const countries = await getDBCountry(countries_id.map(e => e.toString().toUpperCase()))
            if (countries.length) {
                const [activity, created] = await Activity.findOrCreate({
                    where: { name },
                    defaults: {
                        name,
                        difficulty,
                        duration,
                        season,
                    },
                })
                let nameCountries = []
                await countries.map(async e => {
                    nameCountries.push(e.dataValues.name);
                    await e.addActivity(activity)
                })
                res.status(200).send(`Activity created in ${nameCountries.join(', ')}`)

            } else {
                res.status(404).send(`Countries not found ${countries_id.join(", ").toUpperCase()}`)
            }

        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        }
    } else {
        const activities = await getDBActivities()
        res.status(200).json(activities)
    }
})

module.exports = router;
