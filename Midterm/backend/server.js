require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const coffeeRoutes = require("./routes/coffee");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.get("/", (req, res) => res.send("☕ CoffeeApp API is running..."));
app.use("/api/coffee", coffeeRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
