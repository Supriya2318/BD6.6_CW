let { DataTypes, sequelize } = require("../lib/");

let movie = sequelize.define("movie", {
  title: DataTypes.TEXT,
  director: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  year: DataTypes.NUMBER,
  summary: DataTypes.TEXT,
});

module.exports = { movie };