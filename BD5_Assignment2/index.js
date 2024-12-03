let express = require("express");
let app = express();
app.use(express.json());

let { sequelize } = require("./lib/index");
let { role } = require("./models/role.model");
let { department } = require("./models/department.model");
let { employee } = require("./models/employee.model");

// sample data
const employees = [
  {
    employeeId: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    departmentId: 1,
    roleId: 1,
  },
  {
    employeeId: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    departmentId: 2,
    roleId: 2,
  },
  {
    employeeId: 3,
    name: "Ankit Verma",
    email: "ankit.verma@example.com",
    departmentId: 1,
    roleId: 3,
  },
];

const departments = [
  { departmentId: 1, name: "Engineering" },
  { departmentId: 2, name: "Marketing" },
];

const roles = [
  { roleId: 1, title: "Software Engineer" },
  { roleId: 2, title: "Marketing Specialist" },
  { roleId: 3, title: "Product Manager" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await role.bulkCreate(roles);
    await department.bulkCreate(departments);
    await employee.bulkCreate(employees);
    res.status(200).json("data seeded successfully..!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Get All Employees
async function getAllEmployees() {
  let allEmployee = await employee.findAll();
  return { employees: allEmployee };
}
app.get("/employees", async (req, res) => {
  try {
    let response = await getAllEmployees();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Employee by ID
async function getEmployeeById(id) {
  let result = await employee.findOne({ where: { id } });
  return { result };
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await getEmployeeById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Employees by Department
async function getEmployeesByDepartment(departmentId) {
  let results = await employee.findAll({ where: { departmentId } });
  return { employees: results };
}
app.get("/employees/department/:id", async (req, res) => {
  try {
    let departmentId = req.params.id;
    let response = await getEmployeesByDepartment(departmentId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Employees Sorted by Name
async function sortEmployeesByName(orderBy) {
  let results = await employee.findAll({ order: [["name", orderBy]] });

  return { tickets: results };
}
app.get("/employees/sort-by-name", async (req, res) => {
  try {
    let orderBy = req.query.order;
    let response = await sortEmployeesByName(orderBy);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Add a New Employee
async function addNewEmployee(data) {
  let newEmp = await employee.create(data);
  return { newEmp };
}
app.post("/employees/new", async (req, res) => {
  try {
    let data = req.body;
    let response = await addNewEmployee(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Update Employee Details
async function updateTicketDetailsById(newData, id) {
  let existingEmployee = await employee.findOne({ where: { id } });
  if (!existingEmployee) {
    return {};
  }
  existingEmployee.set(newData);
  let updatedEmp = await existingEmployee.save();

  return { updatedEmp };
}
app.post("/employees/:id", async (req, res) => {
  try {
    let newData = req.body;
    let id = req.params.id;
    let response = await updateTicketDetailsById(newData, id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Delete an Employee
async function deleteEmployeeById(id) {
  let destroyedEmp = await employee.destroy({
    where: { id },
  });

  if (destroyedEmp === 0) return {};

  return { message: "Employee with ID " + id + " has been deleted." };
}
app.post("/employees", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get All Employees by Role
async function getAllEmployeeByRole(id) {
  let results = await employee.findAll({
    where: {
      roleId: id,
    },
  });
  if (results.length === 0) {
    return "No employee with role id: " + id;
  }
  return { results };
}
app.get("/employees/role/:id", async (req, res) => {
  try {
    let roleId = req.params.id;
    let response = await getAllEmployeeByRole(roleId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
