//gọi thư viện
const express = require("express");
const cors = require("cors"); 
const jwt = require("jsonwebtoken");
const path = require("path");

const userServer = require("./user");

require('dotenv').config();

//tạo server
const app = express();

app.use(express.json());
app.use(cors());

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../FE/login.html"));
});

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "../FE/users.html"));
});


// khóa bảo mật token
const SECRET_KEY = process.env.SECRET_KEY;


//login
app.post("/login", async(req, res) =>{
    const {user, pass} = req.body;

    const acc = await userServer.login(user, pass);
    if (!acc){
        return res.status(401).json({message: "Login failed" });
    }
    
    const token = jwt.sign(
        {
        username: acc.username,
        role: acc.role
        },
        SECRET_KEY,
        {expiresIn: "1h"} //thời gian token hoạt động
    );


    res.json({
        message: "login success",
        token,
        user: {
            id: acc.id,
            username: acc.username,
            role: acc.role
        }
    })
});


//Check token
function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({message: "Missing token"});
    }

    const token = authHeader.split(" ")[1]; // lấy token phía sau "Bearer "

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch (err){
        res.status(401).json({ message: "Invalid token"});
    }
}

// USERS
app.get("/users", authMiddleware, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin only" });
    }

    const users = await userServer.getAllUsers();
    res.json(users);
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});