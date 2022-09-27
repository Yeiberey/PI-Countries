const axios = require("axios");
const { QueryTypes, Sequelize } = require('sequelize');
const { Country, Activity, conn, Op } = require('../db.js');
const { API_KEY_COUNTRY } = process.env

const getDBCountries = async () => {

    const db = await Country.findAll()
    if (!db.length) {

        const apiUrl = await axios.get(API_KEY_COUNTRY)
        const apiInfo = apiUrl.data.map((r, i) => {
            return {
                id: r.cca3,
                name: r.name.common,
                imageFlag: r.flags[1],
                continent: r.continents[0],
                capital: r.capital ? r.capital[0] : 'Not there are capital',
                subregion: r.subregion,
                area: r.area,
                population: r.population,
            }
        })
        await Country.bulkCreate(apiInfo)
        return apiInfo
    }
    return db
}

const getDBCountry = async (id) => {
    try {
        await getDBCountries()
        const country = await Country.findAll({
    
            where: {
                id: id
            },
                include: 'activities'
        })
        return country;
        
    } catch (error) {
        throw new TypeError(error)
    }
}
const getDBCountryName = async ({ name, capital, continent }) => {
    await getDBCountries()
    const value = (name ? name : capital?capital:continent)
    console.log(value)
    const db = await Country.findAll({
        where: Sequelize.where(Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('LOWER', Sequelize.col(name ? 'name' : capital?'capital':'continent')), 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u'),
            'LIKE', Sequelize.fn('LOWER', '%' + value + '%'))

        ,
    }
    )
    return db;
}

module.exports = {
    getDBCountries,
    getDBCountry,
    getDBCountryName
}
