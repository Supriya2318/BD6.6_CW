const express = require("express");
const cors = require("cors");
const { getAllGames, getGameById } = require("./controllers");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/games", async (req, res) => {
  const games = getAllGames();
  res.status(200).json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  const game = getGameById(parseInt(req.params.id));
  res.status(200).json({ game });
});

module.exports = { app };
