const express = require("express");

const { authMiddleware, adminOnly } = require("./middlewares/users.middlewares");
const { 
    loginController , 
    getStudentsScoreController, 
    getScoreStatsController, 
    checkStudentExistController,
    createStudentController
} = require("./Controller/users.controller");


const app = express();
app.use(express.json());

app.post("/login", loginController);

app.get("/students", authMiddleware, adminOnly, getStudentsScoreController);

app.get("/students/stats", authMiddleware, adminOnly, getScoreStatsController);

app.get("/students/check/:name", authMiddleware, adminOnly, checkStudentExistController);

app.post("/students/create", authMiddleware, adminOnly, createStudentController);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));