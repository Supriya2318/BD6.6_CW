let request = require("supertest");
let { app } = require("../index.js");
let {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
} = require("../book.js");

let http = require("http");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  it("GET API /api/books should return 404 if no books are found", async () => {
    getBooks.mockReturnValue([]);
    const response = await request(server).get("/api/books");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("no books found.");
  });

  it("GET API /api/books/:id should return 404 for non-existing book", async () => {
    getBookById.mockReturnValue(null);
    const response = await request(server).get("/api/books/898");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("book not found.");
  });

  it("GET API /api/reviews should return 404 if no reviews are found", async () => {
    getReviews.mockReturnValue([]);
    const response = await request(server).get("/api/reviews");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("no reviews found.");
  });

  it("GET API /api/reviews/:id should return 404 for non-existing review", async () => {
    getReviewById.mockReturnValue(null);
    const response = await request(server).get("/api/reviews/989");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("review not found.");
  });
});
