const nodemailer = require("nodemailer");
const pool = require("../DB/db");

require("dotenv").config(); // Load environment variables

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

        // Send email if status is 'New'
        if (status === "Newxxx") {
        const transporter = nodemailer.createTransport({
          host: "pp-ser-agents.dowjones.net",
          port: 25,
          secure: false,
          tls: {
            rejectUnauthorized: false,
          },
        });
          
          
          const htmlContent = `
          <html>
          <body>
          <p>Hello PAS support team</p>
          <p>You have a new request for the user <strong>${name}</strong> from the New York Post PAS Request App:</p>
          <p><em>Details Below:</em></p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Name: </strong>${name}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Email Address: </strong>${emailAddress}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Request Type: </strong>${requestType}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Date Needed: </strong>${requestNeededDate}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Applications: </strong>${applicationsInvolved}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Model After: </strong>${modelAfter}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Workstation Type: </strong>${macOrPc}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Requested By: </strong>${requestedBy}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Status: </strong>${status}</p>
          <p style="padding: 0px; border-left: 3px solid #d0d0d0;">&nbsp;<strong> Notes: </strong>${notes}</p>
          `;
          
          // Prepare the email content
          const mailOptions = {
            from: "no-reply@dowjones.com", // Email address to be shown as the sender
            // to: "john.margotti@dowjones.com", // Email address of the recipient
            to: "pagappsup@dowjones.com", // Email address of the recipient
            subject: "New NYP Request Notification",
            html: htmlContent,
          };

          // Send the email
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }
      } else if (req.method === "PUT" && req.params.id) {
        // Handle PUT request: Update an existing request
        const requestId = req.params.id;

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
