const express = require("express");
const router = express.Router();
const Coffee = require("../models/Coffee");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Coffee.find();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get by category
router.get("/category/:name", async (req, res) => {
  try {
    const items = await Coffee.find({ category: req.params.name });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Surprise menu item
router.get("/surprise", async (req, res) => {
  try {
    const count = await Coffee.countDocuments();
    const random = Math.floor(Math.random() * count);
    const item = await Coffee.findOne().skip(random);
    res.json(item);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
