const axios = require("axios");
const { Activities } = require('../db.js');
const { getDBCountries } = require('../controllers/getAllCountries.js');
const { CHAR, NUMBER } = require("sequelize");

const getDBActivities = async () => {

    const db = await Activities.findAll()

    // if (!db.length) {
    //     const countries = await getDBCountries()
    //     const sendDBActivities = countries.map((e, i) => {
    //         return {
    //             id: i + 1,
    //             name: "Museo del oro",
    //             difficulty: Math.floor(Math.random() * 3),
    //             duration: Math.floor(Math.random() * 60),
    //             season: "season",
    //             country_id: e.id
    //         }
    //     })
    //     Activities.bulkCreate(sendDBActivities)
    //     return sendDBActivities
    // }
    return db
}
const getDBActivity = async (id) => {

    const db = await Activities.findByPk(id)
    return db;
}
module.exports = {
    getDBActivities,
    getDBActivity
}