const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const nodemailer = require("nodemailer");
const db = require("../DB/db"); // Adjust the path as necessary

const generateAndSendTasksDueReport = async (req, res) => {
  try {
    console.log("Route /reports/tasksdue hit. Starting report generation...");

    // Get today's date and format it as 'YYYY-MM-DD'
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnighttoday.setUTCHours(0, 0, 0, 0); // Reset time to midnight in UTC

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const todayStr = formatDate(today);
    console.log(`Formatted today's date: ${todayStr}`);

    // Query the database for tasks due today or sooner and with status NOT "Complete"
    const query = `
      SELECT *
      FROM requests
      WHERE request_needed_date::date <= $1::date
        AND status != 'Complete'
      ORDER BY request_needed_date ASC;
    `;
    console.log("Executing database query...");
    const { rows: tasks } = await db.query(query, [todayStr]);
    console.log(`Query executed. Number of tasks retrieved: ${tasks.length}`);

    if (tasks.length === 0) {
      console.log("No tasks due today or sooner with status NOT 'Complete'. No email will be sent.");
      res.send("No tasks due today or sooner with status NOT 'Complete'. No email sent.");
      return;
    }

    // Generate the PDF report with 11x17 landscape format
    console.log("Generating PDF report...");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [792, 1224], // 11x17 inches in points
    });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Dark blue color
    doc.text("NYP Requests Due Today or Sooner (Status: NOT 'Complete')", 40, 40);

    // Define columns (excluding "Notes")
    const columns = [
      "Date Needed",
      "Name",
      "Email Address",
      "Request Type",
      "Applications",
      "Model After",
      "Device",
      "Status",
      "Requested By",
      "Requested Date",
      "Completed By",
      "Completed Date",
      "Ticket Number",
    ];

    // Map tasks to rows (excluding "Notes")
    const rows = tasks.map((task) => {
      const requestNeededDate = task.request_needed_date ? new Date(task.request_needed_date) : null;
      const formattedRequestNeededDate = requestNeededDate
        ? [String(requestNeededDate.getMonth() + 1).padStart(2, "0"), String(requestNeededDate.getDate()).padStart(2, "0"), String(requestNeededDate.getFullYear())].join("/")
        : "";

      const dateEntered = task.date_entered ? new Date(task.date_entered).toLocaleString() : "";
      const completedDate = task.completed_date ? new Date(task.completed_date).toLocaleString() : "";

      return [
        formattedRequestNeededDate,
        task.name || "",
        task.email_address || "",
        task.request_type || "",
        task.applications_involved || "",
        task.model_after || "",
        task.mac_or_pc || "", // Changed to "Device"
        task.status || "",
        task.requested_by || "",
        dateEntered,
        task.completed_by || "",
        completedDate,
        task.ticket_number || "",
      ];
    });

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 60,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineWidth: 0.5, // Thickness of cell borders
        lineColor: [0, 0, 0], // Black border for all cells
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        lineWidth: 0.5, // Ensure header rows have consistent borders
        lineColor: [0, 0, 0], // Black border for header cells
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Light grey for alternate rows
      },
    });

    console.log("PDF report generated successfully.");

    const pdfBuffer = doc.output("arraybuffer");

    // Set up email options
    const emailOptions = {
      from: "no-reply@dowjones.com", 
      to: "pagappsup@dowjones.com", 
      subject: "NYP Requests Due Today or Sooner (Status: NOT 'Complete')",
      text: "Please find the attached report of NYP Requests due today or sooner with status NOT 'Complete'.",
      attachments: [
        {
          filename: `NYP_Requests_Due_${todayStr}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    };

    console.log("Setting up email transporter...");
    const transporter = nodemailer.createTransport({
      host: "pp-ser-agents.dowjones.net",
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false },
    });

    console.log("Sending email...");
    await transporter.sendMail(emailOptions);

    console.log("Email sent successfully.");
    res.send("Email processed successfully and sent.");
  } catch (error) {
    console.error("Error generating and sending the report:", error);
    res.status(500).send("Error generating and sending the report.");
  }
};

module.exports = {
  generateAndSendTasksDueReport,
};
