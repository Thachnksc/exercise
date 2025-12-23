const userService = require("../Service/users.service");

async function loginController(req, res) {
    try {
        const { userName, password} = req.body;
        const result = await userService.login(userName, password);
            if (!result){
                return res.status(401).json({ message: "Login failed" });
            }
        res.json({ 
            message: "Login success", 
            token: result.token, 
            user: result.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
    
}

async function getStudentsScoreController(req, res) {
    try {
        const result = await userService.getStudentsScore();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
    
}

async function getScoreStatsController(req, res) {
    try {
        const stats = await userService.getScoreStats();
    res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function checkStudentExistController(req, res) {
    try {
        const { name } = req.params;
        const result = await userService.checkStudentExist(name);
        res.json(result);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function createStudentController(req, res) {
    try {
        const result = await userService.createStudent(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    loginController, 
    getStudentsScoreController,
    getScoreStatsController,
    checkStudentExistController,
    createStudentController
};