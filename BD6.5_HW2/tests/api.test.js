const request = require('supertest');
const { app, validateEmployee, validateCompany } = require('../index.js');
const http = require('http');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001,done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
    it("should add new employee with valid input", async () => {
        const response = await request(server)
        .post('/api/employees')
        .send({
            name: "John Doe",
            companyId: 1
        })
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            id: 1,
            name: "John Doe",
            companyId: 1
        });
    });
    it("should return 400 for invalid employee input", async () => {
        const response = await request(server)
        .post('/api/employees').send({name: "John Doe"});
        expect(response.statusCode).toBe(400);
        expect(response.text).toEqual("Company ID is required and should be numeric.")
    });
    it("should add new company with valid input", async () => {
        const response = await request(server)
        .post('/api/companies')
        .send({
            name: "TechCorp"
          })
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            id: 1,
            name: "TechCorp"
        });
    });
    it("should return 400 for invalid employee input", async () => {
        const response = await request(server)
        .post('/api/companies').send({name: 1});
        expect(response.statusCode).toBe(400);
        expect(response.text).toEqual("Company name is required and should be a string.")
    });
});

describe("Validations Functions", () => {
    it("should return null if employee input is valid", async() => {
        expect(validateEmployee({
            name: "John Doe",
            companyId: 1
        })).toBeNull();
    });
    it("should return error message if employee input is invalid", async () => {
        expect(validateEmployee({
            name: "John Doe"
        }),).toEqual("Company ID is required and should be numeric.");
        expect(validateEmployee({
            gameId: 1
        }),).toEqual("Name is required and should be a string.");  
    });
    it("should return null if company input is valid", async() => {
        expect(validateCompany({
            name: "TechCorp"
          })).toBeNull();
    });
    it("should return error message if company input is invalid", async () => {
        expect(validateCompany({
            name: 1
        }),).toEqual("Company name is required and should be a string."); 
    });
})