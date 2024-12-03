let games = [
  { id: 1, title: "The Legend of Zelda", genreId: 1 },
  { id: 2, title: "Super Mario Bros", genreId: 2 },
];

let genres = [
  { id: 1, name: "Action-Adventure" },
  { id: 2, name: "Platformer" },
];

async function getGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function getGenres() {
  return genres;
}

async function getGenreById(id) {
  return genres.find((genre) => genre.id === id);
}
module.exports = { getGames, getGameById, getGenres, getGenreById };
