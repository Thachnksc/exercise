//gọi thư viện
const express = require("express");
const cors = require("cors"); 

const userServer = require("./user");

//tạo server
const app = express();
app.use(cors());

app.use(express.json());

//login
app.post("/login", (req, res) =>{
    const {user, pass} = req.body;

    const acc = userServer.login(user, pass);
    if (acc == null){
        return res.status(401).json({message: "Login failed" });
    }
    
    res.json({
        message: "login success",
        user: {
            username: acc.username,
            role: acc.role
        }
    })
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});