const axios = require("axios");
const { QueryTypes, Sequelize } = require('sequelize');
const { Countries, Activities, conn, Op } = require('../db.js');
const { API_KEY_COUNTRY } = process.env

const getDBCountries = async () => {

    const db = await Countries.findAll()
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
        await Countries.bulkCreate(apiInfo)
        return apiInfo
    }
    return db
}

const getDBCountry = async (id, getDBActivities) => {
    await getDBCountries()
    await getDBActivities()
    //Country.sync({ logging: console.log })
    let country = await Countries.findOne({
        //logging: true,
        where: {
            id: id
        }
    })
    if(country){
        country = country.dataValues
        const activities = await Activities.findAll({
            where:{
                country_id: country.id
            }
        })
        country = {...country, activities }
    }
    // const db = await conn.query(`SELECT c."name", count(*) as activities  FROM "countries" as c join "activities" as a on c."id" = a."country_id" GROUP BY c."name"`);


    return country;
}
const getDBCountryName = async ({ name, capital }) => {
    await getDBCountries()
    const value = (name ? name : capital).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const db = await Countries.findAll({
        where: Sequelize.where(Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('REPLACE', Sequelize.fn('LOWER', Sequelize.col(name ? 'name' : 'capital')), 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u'),
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
