let request = require("supertest");
let {
  app,
  validateUser,
  validateBook,
  validateReview,
} = require("../index.js");

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
  it("should add a new user with valid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John Doe", email: "johndoe@email.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      email: "johndoe@email.com",
    });
  });

  it("should return 400 for invalid user input", async () => {
    const res = await request(server).post("/api/users").send({ name: "John" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be a string");
  });

  it("should add a new book with valid input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby", author: "F Scott Fitzgerald" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Great Gatsby",
      author: "F Scott Fitzgerald",
    });
  });

  it("should return 400 for invalid book input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Author is required and should be a string");
  });

  it("should add a new review with valid input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great Writing!", userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great Writing!",
      userId: 1,
    });
  });

  it("should return 400 for invalid review input", async () => {
    const res = await request(server).post("/api/reviews").send({ userId: 1 });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Content is required and should be a string");
  });
});
describe("Validation Functions", () => {
  it("should validate user input correctly", async () => {
    expect(
      validateUser({ name: "John", email: "johndoe@email.com" }),
    ).toBeNull();

    expect(validateUser({ name: "John" })).toEqual(
      "Email is required and should be a string",
    );

    expect(validateUser({ email: "johndoe@email.com" })).toEqual(
      "Name is required and should be a string",
    );
  });

  it("should validate book input correctly", () => {
    expect(
      validateBook({
        title: "The Great Gatsby",
        author: "F Scott Fitzgerald",
      }),
    ).toBeNull();

    expect(validateBook({ title: "The Great Gatsby" })).toEqual(
      "Author is required and should be a string",
    );

    expect(validateBook({ author: "F Scott Fitzgerald" })).toEqual(
      "Title is required and should be a string",
    );
  });

  it("should validate review input correctly", () => {
    expect(
      validateReview({
        content: "Great Writing!",
        userId: 1,
      }),
    ).toBeNull();

    expect(validateReview({ content: "Great Writing!" })).toEqual(
      "User Id is required and should be a number",
    );

    expect(validateReview({ userId: 1 })).toEqual(
      "Content is required and should be a string",
    );
  });
});