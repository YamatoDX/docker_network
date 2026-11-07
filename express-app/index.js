
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

const client = new MongoClient(
  process.env.MONGO_URI,
  { serverSelectionTimeoutMS: 5000 }
);

const db = client.db("myapp");
const users = db.collection("users");

// Basic endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Express API is running"
  });
});

// Check MongoDB connection
app.get("/health", async (req, res) => {
  try {
    await client.db("admin").command({ ping: 1 });

    res.json({
      express: "running",
      mongodb: "connected"
    });
  } catch (error) {
    res.status(503).json({
      mongodb: "unavailable"
    });
  }
});

// CREATE USER
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        error: "Valid name and email are required"
      });
    }

    const result = await users.insertOne({
      name: name.trim(),
      email: email.trim()
    });

    res.status(201).json({
      message: "User created",
      id: result.insertedId.toString()
    });

  } catch (error) {
    console.error(error);
    res.status(503).json({
      error: "Database operation failed"
    });
  }
});

// GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const result = await users.find({})
      .limit(100)
      .toArray();

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(503).json({
      error: "Database operation failed"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express listening on port ${PORT}`);
});
