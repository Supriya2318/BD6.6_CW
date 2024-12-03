const express = require("express");
const app = express();
app.use(express.json());

const employees = [];
const companies = [];
// Exercise 1: Add a New Employee
function validateEmployee(employee) {
  if (!employee.name || typeof employee.name !== "string") {
    return 'Name is required and should be a string.';
  }
  if (!employee.companyId || typeof employee.companyId !== "number") {
    return 'Company ID is required and should be numeric.';
  }
  return null;
}
app.post('/api/employees', (req, res) => {
  const error = validateEmployee(req.body);
  if (error) return res.status(400).send(error);
  const employee = {
    id: employees.length + 1,
    ...req.body
  };
  employees.push(employee);
  res.status(201).json(employee);
});

// Exercise 2: Add a New Company
function validateCompany(company){
  if(typeof company.name !== 'string' || !company.name) {
    return "Company name is required and should be a string."
  }
  return null;
}
app.post('/api/companies', (req, res) => {
  const error = validateCompany(req.body);
  if (error) return res.status(400).send(error);
  const company = {
    id: companies.length + 1,
    ...req.body
  };
  companies.push(company);
  res.status(201).json(company);
});

module.exports = {
  app,
  validateEmployee,
  validateCompany
};