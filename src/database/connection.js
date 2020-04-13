const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.argv.slice(2)[0] == 'production' ? configuration.development : configuration.test;

const connection = knex(config);

module.exports = connection;