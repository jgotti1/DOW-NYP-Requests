const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const requestAllController = require("./controllers/createRequest");
const getController = require("./controllers/getRequests");
const deleteController = require("./controllers/deleteRequest");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// default route
app.get("/", (req, res) => {
  res.send("Welcome to NYP Requests");
});

// ******* request routes *******

// write new request
app.post("/requests", requestAllController.createRequest);

// get all requests
app.get("/requests/all", getController.getRequests);

// get single request by ID
app.get("/requests/:id", getController.getRequests);

// delete single request by ID
app.delete("/requests/:id", deleteController.deleteRequestById);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
