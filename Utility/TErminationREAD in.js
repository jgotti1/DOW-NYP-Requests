const { Pool } = require("pg");
const data = require("./datatermination"); // Assuming termination.js exports the array of arrays

// Database connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nypr",
  password: "postgres",
  port: 5432,
});

const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

const insertData = async (data) => {
  const client = await pool.connect();
  try {
    if (client) {
      console.log("Connected to database");
    } else {
      throw new Error("Database connection failed");
    }

    await client.query("BEGIN");
    const queryText = `
      INSERT INTO requests 
      (request_needed_date, ticket_number, name, applications_involved, requested_by, date_entered, completed_date, notes, email_address, request_type, model_after, mac_or_pc, completed_by, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id;
    `;

    // Log the query text
    console.log("Query text:", queryText);

    for (const row of data) {
      const values = [
        isValidDate(row[0]) ? row[0] : "1/1/2001", // request_date_needed, check if valid date
        row[1], // ticket_number
        row[2] || "N/A", // name
        row[3] || "N/A", // applications_involved
        row[5] || "N/A", // requested_by
        isValidDate(row[6]) ? row[6] : "1/1/2001", // date_entered, check if valid date
        isValidDate(row[8]) ? row[8] : "1/1/2001", // completed_date, check if valid date
        row[9] || "N/A", // notes
        row[10] || "N/A", // email_address
        row[11] || "N/A", // request_type
        row[12] || "N/A", // model_after
        row[13] || "N/A", // mac_or_pc
        row[14] || "N/A", // completed_by
        row[15] || "N/A", // status
      ];

      const res = await client.query(queryText, values);
      console.log(`Inserted row with ID: ${res.rows[0].id}`);
    }

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
