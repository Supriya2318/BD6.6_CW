let { DataTypes, sequelize } = require("../lib/");

let recipe = sequelize.define("recipe", {
  title: DataTypes.TEXT,
  chef: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  preparationTime: DataTypes.NUMBER,
  instructions: DataTypes.TEXT,
});

module.exports = { recipe };