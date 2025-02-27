const pool = require("../DB/db");

const deleteRequestById = async (req, res) => {
  try {
    const client = await pool.connect();

    try {
      // Check if request ID is provided in the URL params
      if (req.params.id) {
        const requestId = req.params.id;

        // Delete a single request by ID
        const deleteResult = await client.query("DELETE FROM dow_requests WHERE id = $1 RETURNING *", [requestId]);

        if (deleteResult.rowCount === 0) {
     
          return res.status(404).json({ message: "Request not found" });
        }

        const deletedRequest = deleteResult.rows[0];
        res.status(200).json({ message: "Request successfully deleted", request: deletedRequest });
      } else {
        res.status(400).json({ message: "Request ID is required" });
      }
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error("Error deleting request:", error.message);
    res.status(500).json({ message: "Error deleting request" });
  }
};

module.exports = {
  deleteRequestById,
};
