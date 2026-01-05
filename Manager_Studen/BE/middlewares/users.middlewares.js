const jwt = require("jsonwebtoken");

//require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

function adminOnly(req, res, next) {
    if (req.user.roleName !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    next();
}

module.exports = { authMiddleware, adminOnly };