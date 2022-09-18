const { Router } = require('express');
const bodyParser = require('body-parser')
const { getDBActivities, getDBActivity } = require('../controllers/getAllActivities.js')
const { Activities } = require('../db.js');
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
    const { id, name, difficulty, duration, season, country_id } = req.body
    if (id && name && country_id) {
        try {
            const result = await getDBActivity(id)
            console.log(result)
            if (!result) {
                Activities.create({
                    id,
                    name,
                    difficulty,
                    duration,
                    season,
                    country_id
                })
                res.status(200).send("Activity created")
            } else {
                res.status(404).send("id duplicate")
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
