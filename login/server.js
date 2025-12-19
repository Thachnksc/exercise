//gọi thư viện
const express = require("express");
const cors = require("cors"); 
const jwt = require("jsonwebtoken");


const userServer = require("./user");


//tạo server
const app = express();

app.use(express.json());
app.use(cors());

// khóa bảo mật token - nên chuyển sang .env
const SECRET_KEY = "fj3S!8df9A@#123kdls9s0dk";


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
app.get("/users", async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});