const express = require('express');
const Tiket = require('./schema');

const Router = express.Router();

// POST route for booking tickets
Router.post("/booking", async (req, res) => {
    const { movie, slot, seats } = req.body;

    try {
        const newBooking = new Tiket({ movie, slot, seats });
        const savedBooking = await newBooking.save();
        res.status(200).json({ data: savedBooking, message: "Booking Successful!" });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: "Something went wrong! Please try again."
        });
    }
});

// GET route for fetching all bookings
Router.get("/booking", async (req, res) => {
    try {
        const bookings = await Tiket.find();
        res.status(200).json({ data: bookings });
    } catch (err) {
        res.status(500).json({
            data: null,
            message: "Failed to fetch bookings! Please try again."
        });
    }
});

// PUT route for updating last booking details
Router.put("/booking/:id", async (req, res) => {
    const { id } = req.params;
    const { movie, slot, seats } = req.body;

    try {
        const updatedBooking = await Tiket.findByIdAndUpdate(
            id,
            { movie, slot, seats },
            { new: true }
        );
        if (updatedBooking) {
            res.status(200).json({ data: updatedBooking, message: "Booking Updated Successfully!" });
        } else {
            res.status(404).json({ data: null, message: "Booking not found!" });
        }
    } catch (err) {
        res.status(500).json({
            data: null,
            message: "Something went wrong! Please try again."
        });
    }
});

module.exports = Router;
