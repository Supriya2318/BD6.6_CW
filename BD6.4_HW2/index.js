let { getGames, getGameById, getGenres, getGenreById } = require("./game");
let express = require("express");
let app = express();
app.use(express.json());

app.get("/api/games", async (req, res) => {
  try {
    let games = await getGames();
    if (games.length === 0)
      return res.status(404).json({ error: "No games found" });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/games/:id", async (req, res) => {
  try {
    let game = await getGameById(parseInt(req.params.id));
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    let genres = await getGenres();
    if (genres.length === 0)
      return res.status(404).json({ error: "No genres found" });
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/genres/:id", async (req, res) => {
  try {
    let genre = await getGenreById(parseInt(req.params.id));
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = { app };
