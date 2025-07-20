#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const FRONTEND_TYPES_PATH = path.resolve(
  __dirname,
  "../frontend/src/components/Deck/slideTypes.ts"
);
const SCHEMA_OUT_PATH = path.resolve(__dirname, "../shared/deck-schema.json");

function generateSchema() {
  try {
    console.log("Generating DeckSpec JSON schema from frontend types...");
    execSync(
      `npx ts-json-schema-generator --path ${FRONTEND_TYPES_PATH} --type DeckSpec --out ${SCHEMA_OUT_PATH}`,
      { stdio: "inherit" }
    );
    if (fs.existsSync(SCHEMA_OUT_PATH)) {
      console.log("✅ Schema generated and synced to shared/deck-schema.json");
    } else {
      console.error("❌ Schema generation failed: deck-schema.json not found");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Error generating schema:", err.message);
    process.exit(1);
  }
}

generateSchema();
