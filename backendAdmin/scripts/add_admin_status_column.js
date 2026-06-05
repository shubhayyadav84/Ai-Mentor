import { sequelize } from "../config/db.js";

async function migrateAdminsTable() {
  try {
    console.log("Adding status column to Admins table...");
    await sequelize.query('ALTER TABLE "Admins" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT \'active\'');
    console.log("✅ status column verified/added.");

    console.log("Adding displayId column to Admins table...");
    // For existing rows, SERIAL will automatically populate incrementing values.
    await sequelize.query('ALTER TABLE "Admins" ADD COLUMN IF NOT EXISTS "displayId" SERIAL UNIQUE');
    console.log("✅ displayId column verified/added.");
  } catch (error) {
    console.error("❌ Error migrating Admins table:", error.message);
  } finally {
    await sequelize.close().catch(() => {});
  }
}

migrateAdminsTable();
