const userService = require("../Service/users.service");

async function loginController(req, res) {
    try {
        const { userName, password} = req.body;
        const result = await userService.login(userName, password);
        if (!result){
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
    
}

async function getAllStudentsScoreController(req, res) {
    try {
        const result = await userService.getAllStudentsScore();
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
        const result = await userService.getStudentExist(name);

        res.json(result);
    } catch (err) {
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

async function getScoreByIdController(req, res) {
    try{
        const result = await userService.getScoreById(req.user.userId);
        if(!result){
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    loginController, 
    getAllStudentsScoreController,
    getScoreStatsController,
    checkStudentExistController,
    createStudentController,
    getScoreByIdController
};