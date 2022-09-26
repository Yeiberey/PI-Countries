const axios = require("axios");
const { Activity } = require('../db.js');
const { CHAR, NUMBER } = require("sequelize");

const getDBActivities = async () => {

    const db = await Activity.findAll({
        include: "countries",
        attributes: [/* "difficulty","duration", */["name","value"],["name","label"],"id","name","season"]
    })

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

    const db = await Activity.findByPk(id)
    return db;
}
const getDBActivityName = async (name) => {

    const db = await Activity.findOne({
        where:{
            name
        }
    })
    return db;
}
module.exports = {
    getDBActivities,
    getDBActivity,
    getDBActivityName
}