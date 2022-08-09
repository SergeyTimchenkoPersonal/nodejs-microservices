const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');

console.log(dbConfig);

const { database, username, password, ...config } = dbConfig;
const sequelize = new Sequelize(database, username, password, config);

module.exports = sequelize;
