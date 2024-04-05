const bcrypt = require("bcrypt");
const pool = require("../DB/db");

const checkUser = async (req, res) => {
  const { username, userPassword } = req.body;
  // console.log("Username:", username); // Log the username provided by the user

  try {
    // Retrieve the hashed password from the database for the provided username
    const query = "SELECT password_hash FROM login WHERE username = $1";
    const result = await pool.query(query, [username]);
    // console.log("Query Result:", result.rows); // Log the result of the database query

    if (result.rows.length === 0) {
      // Username not found
      return res.status(404).json({ message: "Username not found" });
    }

    const hashedPassword = result.rows[0].password_hash;
    // console.log("Hashed Password:", hashedPassword); // Log the hashed password retrieved from the database

    // Compare the provided password with the hashed password retrieved from the database
    const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);

    if (passwordMatch) {
      // Passwords match
      res.status(200).json({ message: "Username and password match" });
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Username and password do not match" });
    }
  } catch (error) {
    console.error("Error checking user:", error.message); // Log any error that occurs
    res.status(500).json({ message: "Error checking user" });
  }
};

module.exports = {
  checkUser,
};
