const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from .env file
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.json({ msg: "Welcome to the API" }));
app.use('/api/users', require('./routes/userRoutes')); // Updated route prefix for consistency
app.use('/api/categories', require('./routes/categoryRouter')); // Updated route prefix for consistency
app.use('/api/products', require('./routes/productRouter')); // Updated route prefix for consistency

// Debugging: Log MongoDB URI (masked password)
const maskedURI = process.env.MONGODB_URL.replace(/:\/\/(.*?):(.*?)@/, '://<user>:<password>@');
console.log(`Connecting to MongoDB: ${maskedURI}`); // Logs the URI (masked for password)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit the process with failure code if connection fails
    });

// Global Error Handler (optional, for catching unhandled errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
