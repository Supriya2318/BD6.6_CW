let request = require("supertest");
let { app } = require("../index.js");
let {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("../employee");

let http = require("http");

jest.mock("../employee.js", () => ({
  ...jest.requireActual("../employee.js"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
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

  it("GET API /api/employees should return 404 if no employees are found", async () => {
    getEmployees.mockReturnValue([]);
    const response = await request(server).get("/api/employees");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No employees found");
  });

  it("GET API /api/employees/:id should return 404 for non-existing employee", async () => {
    getEmployeeById.mockReturnValue(null);
    const response = await request(server).get("/api/employees/999");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Employee not found");
  });

  it("GET API /api/departments should return 404 if no departments are found", async () => {
    getDepartments.mockReturnValue([]);
    const response = await request(server).get("/api/departments");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No departments found");
  });

  it("GET API /api/departments/:id should return 404 for non-existing department", async () => {
    getDepartmentById.mockReturnValue(null);
    const response = await request(server).get("/api/departments/888");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("Department not found");
  });
});
