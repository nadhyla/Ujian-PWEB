import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
        return;
    }
    console.log("Connected to MySQL database.");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(data);
    });
});

app.post("/create", (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ message: "Data inserted successfully", data });
    });
});

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ message: "Data updated successfully", data });
    });
});

app.delete("/student/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json({ message: "Data deleted successfully", data });
    });
});

app.listen(5001, () => {
    console.log("Server running at http://localhost:5001");
});
