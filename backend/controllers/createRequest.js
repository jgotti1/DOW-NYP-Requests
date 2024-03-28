const pool = require("../DB/db");

const createRequest = async (req, res) => {
  console.log(`Request Method: ${req.method}`);

  // Destructure request body
  let { name, emailAddress, requestType, requestNeededDate, applicationsInvolved, modelAfter, macOrPc, requestedBy, status, completedDate, completedBy, ticketNumber, notes } =
    req.body;

  // Set dateEntered to the current date and time
  const dateEntered = new Date();

  // Basic validation for required fields
  if (!name || !emailAddress || !requestType || !macOrPc || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await pool.connect();
    try {
      let query;
      let values;

      if (req.method === "POST") {
        // Handle POST request: Create a new request
        // For a new request, you can set requestNeededDate to a provided value or the current date
        if (!requestNeededDate) {
          requestNeededDate = new Date(); // Set to current date if not provided
        }

        if (status === "Complete") {
          // Set completedDate to the current date and time
          completedDate = new Date();
        } else {
          completedDate = null; // Ensure completedDate is null if status is not 'Complete'
        }

        query = `
          INSERT INTO requests (name, email_address, request_type, request_needed_date, applications_involved, model_after, mac_or_pc, requested_by, status, completed_date, completed_by, ticket_number, date_entered, notes)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING id;
        `;
        values = [
          name,
          emailAddress,
          requestType,
          requestNeededDate,
          applicationsInvolved,
          modelAfter,
          macOrPc,
          requestedBy,
          status,
          completedDate,
          completedBy,
          ticketNumber,
          dateEntered,
          notes,
        ];
      } else if (req.method === "PUT" && req.params.id) {
        // Handle PUT request: Update an existing request
        const requestId = req.params.id;

        // Fetch the existing requestNeededDate from the database
        // const existingdateEntered = await client.query("SELECT date_entered FROM requests WHERE id = $1", [requestId]);
        // dateEntered = existingdateEntered.rows[0].date_entered; // Use the existing date

        if (status === "Complete") {
          completedDate = new Date();
        } else {
          completedDate = req.body.completedDate;
        }

        query = `
          UPDATE requests
          SET name=$1, email_address=$2, request_type=$3, request_needed_date=$4, applications_involved=$5, model_after=$6, mac_or_pc=$7, requested_by=$8, status=$9, completed_date=$10, completed_by=$11, ticket_number=$12, notes=$13
          WHERE id=$14
        `;
        values = [
          name,
          emailAddress,
          requestType,
          requestNeededDate, 
          applicationsInvolved,
          modelAfter,
          macOrPc,
          requestedBy,
          status,
          completedDate,
          completedBy,
          ticketNumber,
          notes,
          requestId,
        ];
      }

      const result = await client.query(query, values);
      if (req.method === "POST") {
        const requestId = result.rows[0].id;
        res.status(201).json({ message: "Request created successfully", requestId });
      } else if (req.method === "PUT") {
        res.status(200).json({ message: "Request updated successfully" });
      }
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error("Error handling request:", error.message);
    res.status(500).json({ message: "Error handling request" });
  }
};

module.exports = {
  createRequest,
};
