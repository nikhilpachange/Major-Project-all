const express = require('express');
const cors = require('cors');
const connectDB = require('./dbConnection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// API routes
app.use("/api", require("./routes"));

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
