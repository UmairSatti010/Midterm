require("dotenv").config();
const mongoose = require("mongoose");
const Coffee = require("./models/Coffee");
const menuItems = require("./menuitems");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for CoffeeApp seeding"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const seedMenu = async () => {
  try {
    await Coffee.deleteMany({});
    console.log("🧹 Old items removed");

    await Coffee.insertMany(menuItems);
    console.log("✅ CoffeeApp menu seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedMenu();
