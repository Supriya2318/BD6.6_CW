let {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUsers,
  getUserById,
} = require("./article");
let express = require("express");
let app = express();
app.use(express.json());

app.get("/api/articles", async (req, res) => {
  try {
    let articles = await getArticles();
    if (articles.length === 0)
      return res.status(404).json({ error: "No articles found" });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/articles/:id", async (req, res) => {
  try {
    let article = await getArticleById(parseInt(req.params.id));
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    let comments = await getComments();
    if (comments.length === 0)
      return res.status(404).json({ error: "No comments found" });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/comments/:id", async (req, res) => {
  try {
    let comment = await getCommentById(parseInt(req.params.id));
    if (!Comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    let users = await getUsers();
    if (users.length === 0)
      return res.status(404).json({ error: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    let user = await getUserById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = { app };
