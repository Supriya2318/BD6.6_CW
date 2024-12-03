const { getRandomValues } = require("crypto");
let express = require("express");
let app = express();
app.use(express.json());

let games = [];
let tournaments = [];
// Exercise 1: Add a New Game
function validateGame(game) {
  if (!game.title || typeof game.title !== "string") {
    return "Title is required and should be a string.";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "Genre is required and should be a string.";
  }
  return null;
}
app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  if (error) return res.status(400).send(error);
  let game = {
    id: games.length + 1,
    ...req.body,
  };
  games.push(game);
  res.status(201).json(game);
});

// Exercise 2: Add a New Tournament
function validateTournament(tournament) {
  if (!tournament.name || typeof tournament.name !== "string") {
    return "Name is required and should be a string.";
  }
  if (!tournament.gameId || typeof tournament.gameId !== "number") {
    return "Game ID is required and should be a number.";
  }
  return null;
}
app.post("/api/tournaments", (req, res) => {
  let error = validateTournament(req.body);
  if (error) return res.status(400).send(error);
  let tournament = {
    id: tournaments.length + 1,
    ...req.body,
  };
  tournaments.push(tournament);
  res.status(201).json(tournament);
});

module.exports = { app, validateGame, validateTournament };
