const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "johnadmin",
  password: process.env.DB_PASS || "123qwe",
  database: process.env.DB_NAME || "mydb",
  port: process.env.DB_PORT || 3306, // MySQL Port
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});


const bcrypt = require('bcryptjs');

// ✅ Create Employee API (POST)
app.post("/api/employee", async (req, res) => {
  const { Emp_FName, Emp_LName, Emp_Email, Emp_Phone, EmpRole_ID, Emp_Status, Emp_Username, Emp_Password } = req.body;
  
  if (!Emp_FName || !Emp_LName || !Emp_Email || !Emp_Phone || !EmpRole_ID || !Emp_Status || !Emp_Username || !Emp_Password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(Emp_Password, 10);

  const sql = `INSERT INTO employee (Emp_FName, Emp_LName, Emp_Email, Emp_Phone, EmpRole_ID, Emp_Status, Emp_Username, Emp_Password) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [Emp_FName, Emp_LName, Emp_Email, Emp_Phone, EmpRole_ID, Emp_Status, Emp_Username, hashedPassword], (err, result) => {
    if (err) {
      console.error("❌ Error inserting employee:", err);
      return res.status(500).json({ error: "Failed to register employee" });
    }
    res.status(201).json({ message: "Employee registered successfully!", employeeId: result.insertId });
  });
});


// ✅ Get All Employees API (GET)
app.get("/api/employee", (req, res) => {
  const sql = "SELECT * FROM employee";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching employee:", err);
      return res.status(500).json({ error: "Failed to fetch employee" });
    }
    res.json(results);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
