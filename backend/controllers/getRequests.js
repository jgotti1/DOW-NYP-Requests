const pool = require("../DB/db");

const getRequests = async (req, res) => {


  try {
    const client = await pool.connect();

    try {

      // Check if request ID is provided in the query params
      if (req.params.id) {

        // Retrieve a single request by ID
        const requestId = req.params.id;
        const result = await client.query("SELECT * FROM requests WHERE id = $1", [requestId]);
        const request = result.rows[0]; //return the result
        if (!request) {
          return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json(request);
        console.log(result.rows); 
       

      } else {
        // Retrieve all requests
        const result = await client.query("SELECT * FROM requests");
        const requests = result.rows;
        res.status(200).json(requests); //return the result 
        console.log(result.rows); // Logging the JSON object to the console
      }
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error("Error retrieving requests:", error.message);
    res.status(500).json({ message: "Error retrieving requests" });
  }
};

module.exports = {
  getRequests,
};
