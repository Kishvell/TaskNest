const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.connect()
  .then(() => console.log("📚 PostgreSQL connected successfully"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
