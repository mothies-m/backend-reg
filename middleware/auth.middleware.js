const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token is required' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateUser;