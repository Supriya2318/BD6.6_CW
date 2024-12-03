let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./BD5_Assignment2/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };