let express = require("express");
let app = express();
app.use(express.json());

let { sequelize } = require("./lib/index");
let { customer } = require("./models/customer.model");
let { agent } = require("./models/agent.model");
let { ticket } = require("./models/ticket.model");

// sample data
const tickets = [
  {
    title: "Login Issue",
    description: "Cannot login to account",
    status: "open",
    priority: 1,
    customerId: 1,
    agentId: 1,
  },
  {
    title: "Payment Failure",
    description: "Payment not processed",
    status: "closed",
    priority: 2,
    customerId: 2,
    agentId: 2,
  },
  {
    title: "Bug Report",
    description: "Found a bug in the system",
    status: "open",
    priority: 3,
    customerId: 1,
    agentId: 1,
  },
];

const customers = [
  { customerId: 1, name: "Alice", email: "alice@example.com" },
  { customerId: 2, name: "Bob", email: "bob@example.com" },
];

const agents = [
  { agentId: 1, name: "Charlie", email: "charlie@example.com" },
  { agentId: 2, name: "Dave", email: "dave@example.com" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await customer.bulkCreate(customers);
    await agent.bulkCreate(agents);
    await ticket.bulkCreate(tickets);
    res.status(200).json("data seeded successfully..!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Get All Tickets
async function getAllTickets() {
  let allTickets = await ticket.findAll();
  return { tickets: allTickets };
}
app.get("/tickets", async (req, res) => {
  try {
    let response = await getAllTickets();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Ticket by ID
async function getTicketById(id) {
  let result = await ticket.findOne({ where: { id } });
  return { ticket: result };
}
app.get("/tickets/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await getTicketById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Tickets by Status
async function getTicketByStatus(status) {
  let results = await ticket.findAll({ where: { status } });
  return { tickets: results };
}
app.get("/tickets/status/:status", async (req, res) => {
  try {
    let status = req.params.status;
    let response = await getTicketByStatus(status);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Tickets Sorted by Priority
async function sortTicketsByPriority() {
  let results = await ticket.findAll({ order: [["priority"]] });

  return { tickets: results };
}
app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    let response = await sortTicketsByPriority();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Add a New Ticket
async function addNewTicket(data) {
  await ticket.create(data);
  let results = await ticket.findAll();
  return { tickets: results };
}
app.post("/tickets/new", async (req, res) => {
  try {
    let data = req.body;
    let response = await addNewTicket(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Update Ticket Details
async function updateTicketDetailsById(newData, id) {
  let existingTicket = await ticket.findOne({ where: { id } });
  if (!existingTicket) {
    return {};
  }
  existingTicket.set(newData);
  await existingTicket.save();

  let allTickets = await ticket.findAll();
  return { tickets: allTickets };
}
app.post("/tickets/update/:id", async (req, res) => {
  try {
    let newData = req.body;
    let id = req.params.id;
    let response = await updateTicketDetailsById(newData, id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Delete a Ticket
async function deleteTicketById(id) {
  let destroyedTicket = await ticket.destroy({
    where: { id },
  });

  if (destroyedTicket === 0) return {};

  return { message: "Track with ID " + id + " deleted successfully." };
}
app.post("/tickets/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteTicketById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get All Tickets for a Customer
async function getAllTicketsByCustomerId(id) {
  let results = await ticket.findAll({
    where: {
      customerId: id,
    },
  });
  return { tickets: results };
}
app.get("/tickets/customer/:id", async (req, res) => {
  try {
    let customerId = req.params.id;
    let response = await getAllTicketsByCustomerId(customerId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get All Tickets Handled by an Agent

async function getAllTicketsByAgentId(id) {
  let results = await ticket.findAll({
    where: {
      agentId: id,
    },
  });
  return { tickets: results };
}
app.get("/tickets/agent/:id", async (req, res) => {
  try {
    let agentId = req.params.id;
    let response = await getAllTicketsByAgentId(agentId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
