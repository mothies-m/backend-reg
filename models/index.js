const sequelize = require('../config/database')
const { Sequelize } = require('sequelize')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.models')(Sequelize, sequelize)
db.Speaker = require("./speaker.models")(Sequelize, sequelize);
db.Session = require("./session.models")(Sequelize, sequelize);

db.Speaker.belongsTo(db.User, { as: "User", foreignKey: "user_id" });
db.Session.belongsTo(db.User, { as: "User", foreignKey: "user_id" });
db.Session.belongsTo(db.Speaker, { as: "Speaker", foreignKey: "speaker_id" });
module.exports = db