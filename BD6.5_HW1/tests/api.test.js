let request = require("supertest");
let { app, validateGame, validateTournament } = require("../index");
let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  it("should add a new game with valid input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });

  it("should return 400 for invalid game input", async () => {
    const res = await request(server)
      .post("/api/games")
      .send({ title: "The Legend of Zelda" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Genre is required and should be a string.");
  });

  it("should add a new tournament with valid input", async () => {
    const res = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });

  it("should return 400 for invalid tournament input", async () => {
    const res = await request(server).post("/api/tournaments").send({
      gameId: 1,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Name is required and should be a string.");
  });
});

describe("Validation Functions", () => {
  it("should return null if game input is valid", async () => {
    expect(
      validateGame({
        title: "The Legend of Zelda",
        genre: "Adventure",
      }),
    ).toBeNull();
  });

  it("should return an error message if game input is invalid", async () => {
    expect(
      validateGame({
        title: "The Legend of Zelda",
      }),
    ).toEqual("Genre is required and should be a string.");
    expect(
      validateGame({
        genre: "Adventure",
      }),
    ).toEqual("Title is required and should be a string.");
  });

  it("should return null if tournament input is valid", async () => {
    expect(
      validateTournament({
        name: "Zelda Championship",
        gameId: 1,
      }),
    ).toBeNull();
  });

  it("should return an error message if tournament input is invalid", async () => {
    expect(
      validateTournament({
        name: "Zelda Championship",
      }),
    ).toEqual("Game ID is required and should be a number.");
    expect(
      validateTournament({
        gameId: 1,
      }),
    ).toEqual("Name is required and should be a string.");
  });
});
