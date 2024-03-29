const { Pool } = require("pg");
const fs = require("fs");
const data = require("./data")

// Database connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nypr",
  password: "postgres",
  port: 5432,
});

const insertData = async (data) => {
  const client = await pool.connect();
  try {
    // Check database connection
    if (client) {
      console.log("Connected to database");
    } else {
      throw new Error("Database connection failed");
    }

    await client.query("BEGIN");
    const queryText = `
      INSERT INTO requests 
      (request_needed_date, ticket_number, name, email_address, mac_or_pc, completed_date, notes, date_entered, request_type, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, 'New Hire', 'Complete')
      RETURNING id;
    `;

    // Log the query text
    console.log("Query text:", queryText);

    for (const row of data) {
      const completedDate = row[5] !== "" ? row[5] : null; // check if completed_date is empty

      const values = [
        row[0] !== "" ? row[0] : null, // request_needed_date
        row[1], // ticket_number
        row[2] !== "" ? row[2] : "N/A", // name
        row[3] !== "" ? row[3] : "N/A", // email_address
        row[4] !== "" ? row[4] : "N/A", // mac_or_pc
        completedDate, // completed_date
        row[6] !== "" ? row[6] : null, // notes
      ];

      const res = await client.query(queryText, values);
      console.log(`Inserted row with ID: ${res.rows[0].id}`);
    }

    // Check if data was inserted
    await client.query("COMMIT");
    console.log("Data inserted successfully");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Error inserting data:", e.message);
    throw e;
  } finally {
    client.release();
    console.log("Connection released");
  }
};

insertData(data);
