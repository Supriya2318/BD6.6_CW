let express = require("express");
const app = express();
app.use(express.json());

let employees = [
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

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

async function addEmployee(employee) {
  employee.id = employees.length + 1;
  employees.push(employee);
  return employee;
}

app.get("/employees", async (req, res) => {
  const empList = await getAllEmployees();
  res.json(empList);
});

app.get("/employees/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const emp = await getEmployeeById(id);
  if (!emp) return res.status(404).send("employee not found.");
  res.json(emp);
});

app.post("/employees/new", async (req, res) => {
  const newEmployee = await addEmployee(req.body);
  res.status(201).json(newEmployee);
});

module.exports = {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
};
