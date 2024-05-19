const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

(async () => {
  try {
    await db.raw('SELECT 1+1 as result');
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await db.destroy(); 
  }
})();

module.exports = db;
