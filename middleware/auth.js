const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token to the request object
        req.user = decoded;

        // Call the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;