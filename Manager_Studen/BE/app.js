const express = require("express");

const { loginController } = require("./Controller/user.controller");

const app = express();
app.use(express.json());

app.post("/login", loginController);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));