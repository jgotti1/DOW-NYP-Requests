const pool = require("../DB/db");

const createRequest = async (req, res) => {
  const {
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
  } = req.body;

// Set dateEntered to the current date and time
  const dateEntered = new Date();

  // Basic validation for required fields
  if (!name || !emailAddress || !requestType || !macOrPc || !status || !dateEntered) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO requests (name, email_address, request_type, request_needed_date, applications_involved, model_after, mac_or_pc, requested_by, status, completed_date, completed_by, ticket_number, date_entered, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING id;
      `;
      const values = [
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
        dateEntered, //current date and time not from front end query
        notes,
      ];
      const result = await client.query(query, values);
      const requestId = result.rows[0].id;
      res.status(201).json({ message: "Request created successfully", requestId });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error("Error creating request:", error.message);
    res.status(500).json({ message: "Error creating request" });
  }
};

module.exports = {
  createRequest,
};


