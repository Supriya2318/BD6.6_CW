let { DataTypes, sequelize } = require("../lib/");

let ticket = sequelize.define("ticket", {
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  status: DataTypes.STRING,
  priority: DataTypes.INTEGER,
  customerId: DataTypes.INTEGER,
  agentId: DataTypes.INTEGER,
});

module.exports = { ticket };