let {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
} = require("./employee");
let express = require("express");
let app = express();
app.use(express.json());

app.get("/api/employees", async (req, res) => {
  try {
    let employees = await getEmployees();
    if (employees.length === 0)
      return res.status(404).json({ error: "No employees found" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    let employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/departments", async (req, res) => {
  try {
    let departments = await getDepartments();
    if (departments.length === 0)
      return res.status(404).json({ error: "No departments found" });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
});

app.get("/api/departments/:id", async (req, res) => {
  try {
    let department = await getDepartmentById(parseInt(req.params.id));
    if (!department)
      return res.status(404).json({ error: "Department not found" });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = { app };
