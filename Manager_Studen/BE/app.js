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

app.post("/login", loginController);

app.get("/students", authMiddleware, adminOnly, getAllStudentsScoreController);

app.get("/students/stats", authMiddleware, adminOnly, getScoreStatsController);

app.get("/students/check/:name", authMiddleware, adminOnly, checkStudentExistController);

app.post("/students/create", authMiddleware, adminOnly, createStudentController);

app.get("/score", authMiddleware, getScoreByIdController);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));