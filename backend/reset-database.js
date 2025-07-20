require("dotenv").config();
const { MongoClient } = require("mongodb");

// Get MongoDB connection string from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is not set!");
  console.error(
    "Please make sure you have a .env file with MONGODB_URI in your backend directory."
  );
  process.exit(1);
}

async function resetDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    const db = client.db();

    // Get all collections
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      return;
    }

    // Drop all collections
    for (const collection of collections) {
      await db.collection(collection.name).drop();
    }
  } catch (error) {
    console.error("❌ Error resetting database:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run the reset
resetDatabase();
