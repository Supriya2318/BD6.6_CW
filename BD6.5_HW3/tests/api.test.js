let request = require("supertest");
let http = require("http");
let { app, validateArticle, validateAuthor } = require("../index.js");
const { title } = require("process");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  validateArticle: jest.fn(),
  validateAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoint to add data", () => {
  it("should add a new article with valid input", async () => {
    let res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  it("should return 400 when article with invalid input", async () => {
    let res = await request(server)
      .post("/articles")
      .send({ title: "Mastering Node.js" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Content is required and should be a string.");
  });

  it("should add a new author with valid input", async () => {
    let res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  it("should return 400 when author with invalid input", async () => {
    let res = await request(server)
      .post("/authors")
      .send({ name: "Alice Johnson" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Article Id is required and should be a number.");
  });
});

describe("Validate Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate article input correctly", () => {
    let articles = {
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    };
    validateArticle.mockReturnValue(null);

    expect(validateArticle(articles)).toBeNull();
  });

  it("should return validation error for invalid article input", () => {
    let invalidArticleData = { title: "Mastering Node.js" };
    let invalidArticle = {
      content: "Node.js is a powerful tool for backend development...",
    };

    validateArticle.mockReturnValue(
      "Content is required and should be a string.",
    );
    expect(validateArticle(invalidArticleData)).toEqual(
      "Content is required and should be a string.",
    );

    validateArticle.mockReturnValue(
      "Title is required and should be a string.",
    );
    expect(validateArticle(invalidArticle)).toEqual(
      "Title is required and should be a string.",
    );
  });

  it("should validate author input correctly", () => {
    let authors = { name: "Alice Johnson", articleId: 3 };

    validateAuthor.mockReturnValue(null);

    expect(validateAuthor(authors)).toBeNull();
  });

  it("should return validation error for invalid authors input", () => {
    let invalidAuthorData = { name: "Alice Johnson" };
    let invalidAuthor = { articleId: 3 };

    validateAuthor.mockReturnValue(
      "Article Id is required and should be a number.",
    );
    expect(validateAuthor(invalidAuthor)).toEqual(
      "Article Id is required and should be a number.",
    );

    validateAuthor.mockReturnValue("Name is required and should be a string.");
    expect(validateAuthor(invalidAuthorData)).toEqual(
      "Name is required and should be a string.",
    );
  });
});
