const { Pool } = require("pg");
const data = require("./data_new-hire fix");

// Database connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nypr",
  password: "postgres",
  port: 5432,
});

const updateData = async (data) => {
  const client = await pool.connect();
  try {
    if (client) {
      console.log("Connected to database");
    } else {
      throw new Error("Database connection failed");
    }

    await client.query("BEGIN");

    for (const row of data) {
      const ticketNumber = row[1];
      const name = row[3];
      const applicationsInvolved = row[4];
      const modelAfter = row[5]; 
      const requestedBy = row[6];
   

      const queryText = `
        UPDATE requests
        SET 
          applications_involved = COALESCE($3, applications_involved),
          requested_by = COALESCE($4, requested_by),
          model_after = COALESCE($5, model_after)
        WHERE ticket_number = $1 AND name = $2
        RETURNING id;
      `;

      console.log("Query text:", queryText);

      const values = [
        ticketNumber !== "" ? ticketNumber : null,
        name !== "" ? name : null, // Corrected the order to match the SQL placeholders
        applicationsInvolved !== "" ? applicationsInvolved : null,
        requestedBy !== "" ? requestedBy : null,
        modelAfter !== "" ? modelAfter : null, // Added modelAfter to the values array
      ];

      const res = await client.query(queryText, values);
      if (res.rows.length > 0) {
        console.log(`Updated row with ID: ${res.rows[0].id}`);
      } else {
        console.log(`No matching record found for Ticket Number: ${ticketNumber} and Name: ${name}. No data updated.`);
      }
    }

    await client.query("COMMIT");
    console.log("Data updated successfully");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Error updating data:", e.message);
    throw e;
  } finally {
    client.release();
    console.log("Connection released");
  }
};

updateData(data);
