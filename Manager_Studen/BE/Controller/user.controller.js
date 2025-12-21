const userService = require("../Service/user.service");

async function loginController(req, res) {
    const { userName, password} = req.body;
    const result = await userService.login(userName, password);
    if (!result){
        return res.status(401).json({ message: "Login failed" });
    }
    res.json({ message: "Login success", token: result.token, user: result.user});
}

module.exports = {loginController};