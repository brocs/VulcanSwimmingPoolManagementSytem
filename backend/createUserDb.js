require('dotenv').config(); // Make sure to import dotenv to use environment variables

const mysql = require('mysql2');

// MySQL Database Connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'johnadmin',
  password: process.env.DB_PASS || '123qwe',
  database: process.env.DB_NAME || 'mydb',
  port: process.env.DB_PORT || 3306,
});

// Connect to MySQL server
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS ??;', [process.env.DB_NAME], (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created (or already exists).');

    // Select the created database
    db.query('USE ??;', [process.env.DB_NAME], (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }

      // Create the users table if it doesn't exist (updated to "users")
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          Emp_FName VARCHAR(255) NOT NULL,
          Emp_LName VARCHAR(255) NOT NULL,
          Emp_Email VARCHAR(255) NOT NULL,
          Emp_Phone VARCHAR(255),
          EmpRole_ID INT,
          Emp_Status ENUM('Active', 'Inactive') DEFAULT 'Active',
          Emp_Username VARCHAR(255) NOT NULL,
          Emp_Password VARCHAR(255) NOT NULL
        );
      `;
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created (or already exists).');
        }

        // Close the connection
        db.end();
      });
    });
  });
});
