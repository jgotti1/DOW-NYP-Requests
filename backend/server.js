const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const path = require("path");
const createController = require("./controllers/createRequest");
const getController = require("./controllers/getRequests");
const deleteController = require("./controllers/deleteRequest");

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

// ******* request routes *******

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
