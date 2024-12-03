let express = require("express");
const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(recipe) {
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  return recipe;
}

app.get("/recipes", async (req, res) => {
  const recList = await getAllRecipes();
  res.json(recList);
});

app.get("/recipes/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const rec = await getRecipeById(id);
  if (!rec) return res.status(404).send("recipe not found.");
  res.json(rec);
});

app.post("/recipes/new", async (req, res) => {
  const newRecipe = await addRecipe(req.body);
  res.status(201).json(newRecipe);
});

module.exports = {
  app,
  getAllRecipes,
  getRecipeById,
  addRecipe,
};
