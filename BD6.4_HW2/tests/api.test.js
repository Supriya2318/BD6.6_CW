let request = require("supertest");
let { app } = require("../index.js");
let { getGames, getGameById, getGenres, getGenreById } = require("../game");

let http = require("http");
jest.mock("../game.js", () => ({
  ...jest.requireActual("../game.js"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("GET API /api/games should return 404 if no games are found", async () => {
    getGames.mockReturnValue([]);
    const response = await request(server).get("/api/games");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No games found");
  });

  it("GET API /api/games/:id should return 404 for non-existing game", async () => {
    getGameById.mockReturnValue(null);
    const response = await request(server).get("/api/games/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Game not found");
  });

  it("GET API /api/genres should return 404 if no genres are found", async () => {
    getGenres.mockReturnValue([]);
    const response = await request(server).get("/api/genres");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No genres found");
  });

  it("GET API /api/genres/:id should return 404 for non-existing genre", async () => {
    getGenreById.mockReturnValue(null);
    const response = await request(server).get("/api/genres/989");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Genre not found");
  });
});
