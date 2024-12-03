const request = require("supertest");
const { app, getAllRecipes, getRecipeById, addRecipe } = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3004, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all recipes", async () => {
    mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];

    getAllRecipes.mockResolvedValue(mockRecipes);

    const result = await request(server).get("/recipes");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("should retrieve a specific recipe by id", async () => {
    mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };

    getRecipeById.mockResolvedValue(mockRecipe);

    const result = await request(server).get("/recipes/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it("should add a new recipe", async () => {
    const mockRecipe = {
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };

    addRecipe.mockResolvedValue(mockRecipe);

    const response = await request(server).post("/recipes/new").send({
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(mockRecipe);
  });
});
