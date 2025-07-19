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
    console.log("Connecting to MongoDB...");
    await client.connect();

    const db = client.db();
    console.log(`Connected to database: ${db.databaseName}`);

    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(
      `Found ${collections.length} collections:`,
      collections.map((c) => c.name)
    );

    if (collections.length === 0) {
      console.log("No collections found. Database is already empty.");
      return;
    }

    // Drop all collections
    for (const collection of collections) {
      console.log(`Dropping collection: ${collection.name}`);
      await db.collection(collection.name).drop();
    }

    console.log("✅ Database reset completed successfully!");
    console.log("All collections have been dropped.");
  } catch (error) {
    console.error("❌ Error resetting database:", error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log("Database connection closed.");
  }
}

// Run the reset
resetDatabase();
