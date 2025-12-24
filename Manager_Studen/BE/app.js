const express = require("express");
const cors = require("cors");
const path = require("path");


const { authMiddleware, adminOnly } = require("./middlewares/users.middlewares");
const { 
    loginController , 
    getAllStudentsScoreController, 
    getScoreStatsController, 
    checkStudentExistController,
    createStudentController,
    getScoreByIdController 
} = require("./Controller/users.controller");



const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../FE")));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../FE/index.html"));
});

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.post("/login", loginController);

app.get("/students", authMiddleware, adminOnly, getAllStudentsScoreController);

app.get("/students/stats", authMiddleware, adminOnly, getScoreStatsController);

app.get("/students/check/:name", authMiddleware, adminOnly, checkStudentExistController);

app.post("/students/create", authMiddleware, adminOnly, createStudentController);

app.get("/score", authMiddleware, getScoreByIdController);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));