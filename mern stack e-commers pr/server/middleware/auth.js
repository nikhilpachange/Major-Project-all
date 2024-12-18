const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "No authentication token, authorization denied" });

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid authentication token" });
            
            // Attach the user information to the request object
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;
