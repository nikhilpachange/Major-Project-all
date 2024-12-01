const mongoose = require('mongoose');

// Ticket Schema
const TicketSchema = new mongoose.Schema({
    movie: { type: String, required: true },
    slot: { type: String, required: true },
    seats: {
        A1: { type: Number, default: 0 },
        A2: { type: Number, default: 0 },
        A3: { type: Number, default: 0 },
        A4: { type: Number, default: 0 },
        D1: { type: Number, default: 0 },
        D2: { type: Number, default: 0 }
    }
});

// Model
const Tiket = mongoose.model('Tiket', TicketSchema);
module.exports = Tiket;
