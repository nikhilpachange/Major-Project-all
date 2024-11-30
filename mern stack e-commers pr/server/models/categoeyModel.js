const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true // This should be outside the schema fields
});

module.exports = mongoose.model("Category", categorySchema);
