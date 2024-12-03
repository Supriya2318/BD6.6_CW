let employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", departmentId: 1 },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    departmentId: 2,
  },
];

let departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
];

async function getEmployees() {
  return employees;
}
async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

async function getDepartments() {
  return departments;
}

async function getDepartmentById(id) {
  return departments.find((department) => department.id === id);
}
module.exports = {
  getEmployees,
  getEmployeeById,
  getDepartments,
  getDepartmentById,
};
