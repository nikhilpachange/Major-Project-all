const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
    try {
        // Ensure the user exists
        const user = await Users.findById(req.user.id);
        if (!user) return res.status(400).json({ msg: "User not found" });

        // Check if the user is an admin
        if (user.role !== 1) {
            return res.status(400).json({ msg: "Admin resources access only" });
        }

        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authAdmin;
