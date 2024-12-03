const request = require("supertest");
const {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
} = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
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

  it("should retrieve all employees", async () => {
    mockEmployees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];

    getAllEmployees.mockResolvedValue(mockEmployees);

    const result = await request(server).get("/employees");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should retrieve a specific employee by id", async () => {
    mockEmployee = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };

    getEmployeeById.mockResolvedValue(mockEmployee);

    const result = await request(server).get("/employees/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployee);
  });

  it("should add a new employee", async () => {
    const mockEmployee = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };

    addEmployee.mockResolvedValue(mockEmployee);

    const response = await request(server).post("/employees/new").send({
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(mockEmployee);
  });
});
