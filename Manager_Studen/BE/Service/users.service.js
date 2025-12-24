const userRepository = require("../Repository/users.repository");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

class userService {
    // Login
    async login(userName, password){
        const user = await userRepository.findByName(userName);

        if (!user){
            return null;
        }

        if (user.password !== password){
            return null;
        }

        const token = jwt.sign(
            { 
                userId: user.userId,
                roleName: user.roleName
            },
            SECRET_KEY,
            {expiresIn: "1h"}
        );
        return { user, token };
    }

     
    // Get all user
    async getAllUser(){
        return await userRepository.findAll();
    }

    // get all student and Score
    async getAllStudentsScore() {
        const data = await userRepository.findStudentScore();
        return {
            total: data.length,
            students: data
        };
    }

    // get Score with total, max, min, avg 
    async getScoreStats() {
        const stats = await userRepository.getScoreStatsRepo();

        let averageScore = 0;

        if (stats.avg_score) {
            const avgNumber = parseFloat(stats.avg_score);
            const roundedString = avgNumber.toFixed(2);
            averageScore = Number(roundedString);
        }

        return {
            totalStudentsHaveScore: stats.total_students_have_score || 0,
            totalScore: Number(stats.total_score) || 0,
            highestScore: Number(stats.max_score) || 0,
            lowestScore: Number(stats.min_score) || 0,
            averageScore
        };
    }

    // check student exist
    async checkStudentExist(name) {
        const student = await userRepository.findByName(name);

        if (!student) {
            return {
                exists: false,
                message: "Student not found"
            };
        }

        return {
            exists: true,
            student
        };
    }

    // Create student
    async createStudent(studentData) {
        const exists = await userRepository.findByName(studentData.userName);

        if (exists) {
            return {
                success: false,
                message: "Student name already exists"
            };
        }

        const student = await userRepository.createStudent(studentData);

        return {
            success: true,
            message: "Student created successfully",
            student
        };
    }


    async getScoreById(userId){
        const data = await this.getAllStudentsScore();  

        const list = data.students.filter(s => s.userId === userId);

        if(list.length === 0) {
            return null;
        };

        return {
            userId: list[0].userId,
            userName: list[0].userName,
            roleName: list[0].roleName,
            scores: list
                .map(s => s.score)
                .filter(score => score !== null)
        };
    }



}

module.exports = new userService();