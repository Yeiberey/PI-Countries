/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Countries, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 256,
  name: 'Argentina',
  imageFlag: 'Not there are flag',
  continent: 'r.continents[0]',
  capital: 'buewnos airtes',
  subregion: 'r.subregion',
  area: 16341,
  population: 24565454,
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Countries.sync({ force: true })
    .then(() => Countries.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});
