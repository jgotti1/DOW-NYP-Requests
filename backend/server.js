const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./DB/db");



require("dotenv").config();
const path = require("path");
const createController = require("./controllers/createRequest");
const getController = require("./controllers/getRequests");
const deleteController = require("./controllers/deleteRequest");
const checkUserController = require("./controllers/checkUser");
const taskReportController = require("./controllers/taskReportController");
const createControllerDow = require("./controllers/createRequestDow");
const getControllerDow = require("./controllers/getRequestsDow");
const deleteControllerDow = require("./controllers/deleteRequestDow");
const taskReportControllerDow = require("./controllers/taskReportControllerDow");


const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")))

// setup for running app from backend build folder 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}


console.log(process.env.NODE_ENV);


// default route
app.get("/", (req, res) => {
  res.send("Welcome to NYP Requests");
});

// ******* request routes NYP *******

// write new request
app.post("/requests", createController.createRequest);

// update request
app.put("/requests/:id", createController.createRequest);

// get all requests
app.get("/requests/all", getController.getRequests);

// get single request by ID
app.get("/requests/:id", getController.getRequests);

// delete single request by ID
app.delete("/requests/:id", deleteController.deleteRequestById);

// Route to check if username and password match
app.post("/login", checkUserController.checkUser);

app.get("/reports/tasksdue", taskReportController.generateAndSendTasksDueReport);


// ******* request routes DOW *******

// write new request
app.post("/dowrequests", createControllerDow.createRequestDow);

// update request
app.put("/dowrequests/:id", createControllerDow.createRequestDow);

// get all requests
app.get("/dowrequests/all", getControllerDow.getRequestsDow);

// get single request by ID
app.get("/dowrequests/:id", getControllerDow.getRequestsDow);

// delete single request by ID
app.delete("/dowrequests/:id", deleteControllerDow.deleteRequestByIdDow);


app.get("/dowreports/tasksdue", taskReportControllerDow.generateAndSendTasksDueReportDow);




app.listen(port, async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log(`Database connection successful to ${process.env.DB_HOST} at`, result.rows[0].now);
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
  console.log(`App up and running on port ${port}`);
});
