const mongoose = require('mongoose');

// Define schema for the Users collection
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0, // User role (0 = regular user, 1 = admin)
        },
        cart: {
            type: Array,
            default: [], // User's shopping cart
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("User", userSchema); // Export the model
