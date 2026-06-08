import { Pool } from "pg"

const pool = new Pool({
  host: "localhost",
  user: "sindhu",
  port: 5432,
  password: "12345678",
  database: "interview_db",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

export const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS slots (
        id SERIAL PRIMARY KEY,
        interviewer_id INT REFERENCES users(id) ON DELETE CASCADE,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        is_booked VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS interviews (
        id SERIAL PRIMARY KEY,
        candidate_id INT REFERENCES users(id) ON DELETE CASCADE,
        slot_id INT REFERENCES slots(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("✅ Tables created successfully")
  } catch (err: any) {
    console.log("❌ Failed:", err.message)
  }
}

export default pool