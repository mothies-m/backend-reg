const sequelize = require('../config/database')
const { Sequelize } = require('sequelize')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.models')(Sequelize, sequelize)

module.exports = db