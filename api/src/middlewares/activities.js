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
    const { name, country_id } = req.body
    if (name && country_id) {
        try {
            const country = await getDBCountry(country_id.toString().toUpperCase(), getDBActivities)
            if (country) {
                const activityExiste = await getDBActivityName(name)
                if(!activityExiste){
                    const activity = await Activity.create({
                        name,
                    })
                    await country.addActivity(activity)
                    res.status(200).send("Activity created")
                }else{
                    res.status(404).send('name activity duplicate')
                }

            } else {
                res.status(404).send(`not there are country ${country_id.toString().toUpperCase()}`)
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
