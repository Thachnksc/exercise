const userRepository = require("../Repository/users.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

//require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

class userService {

    // Login
    async login(userName, password){
        const user = await userRepository.findByUserName(userName);

        if (!user){
            return null;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match ){
            return null;
        }

        const token = jwt.sign(
            { 
                userId: user.userId,
                roleId: user.role.roleId,
                roleName: user.role.roleName
            },
            SECRET_KEY,
            {expiresIn: "1h"}
        );

        const safeUser = {
            userId: user.userId,
            userName: user.userName,
            roleId: user.role.roleId,
            roleName: user.role.roleName
        };

        return { 
            message: "Login success",
            user: safeUser, 
            token 
        };
    }

    // Kiểm tra mật khẩu mạnh với Zod 
    validatePassword(password) {
        return z
            .string()
            .min(8)
            .regex(/[A-Z]/)
            .regex(/[0-9]/)
            .safeParse(password);
    }

    // Kiểm tra userId format với Zod 
    validateUserId(userId) {
        return z
            .string()
            .min(3)
            .max(15)
            .regex(/^[a-zA-Z0-9]+$/)
            .safeParse(userId);
    }

    // get all student and Score
    async getAllStudentsScore() {
        const students = await userRepository.findStudentsWithScore();
        return {
            total: students.length,
            students: students.map(s => ({
                userId: s.userId,
                userName: s.userName,
                roleName: s.role.roleName,
                scores: s.scores.map(sc => sc.score)
            }))
        };
    }

    // get Score with total, max, min, avg 
    async getScoreStats() {
        const stats = await userRepository.getScoreStats();

        return {
        totalStudentsHaveScore: stats._count.score ?? 0,
        totalScore: stats._sum.score ?? 0,
        highestScore: stats._max.score ?? 0,
        lowestScore: stats._min.score ?? 0,
        averageScore: Number((stats._avg.score ?? 0).toFixed(2))
        };
    }

    // Create student
    async createStudent({ userId, userName, password }) {

        // Validate userId
        const idCheck = this.validateUserId(userId);
        if (!idCheck.success) {
            return { success: false, errors: idCheck.error.errors };
        }

        // Validate password
        const passCheck = this.validatePassword(password);
        if (!passCheck.success) {
            return { success: false, errors: passCheck.error.errors };
        }
   

        // Check userName trùng
        const existed = await userRepository.findByUserName(userName);
        if (existed) {
            return {
                success: false,
                message: "Username already exists"
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await userRepository.createStudent({
            userId,
            userName,
            password: hashedPassword,
        });

        return {
            success: true,
            student: {
                userId: student.userId,
                userName: student.userName
            }
        };
    }


    async getScoreById(userId){
        const student = await prisma.user.findUnique({
            where: { userId },
            include: { scores: true, role: true }
        });

        if(!student) return null;

        return {
            userId: student.userId,
            userName: student.userName,
            roleName: student.role.roleName,
            scores: student.scores.map(sc => sc.score)
        };
    }

    async getStudentExist(userName){
        const existed = await userRepository.findByUserName(userName);
        if (existed) {
            return {
                success: false,
                message: "Username already exists"
            };
        }
        return {
            success: true,
            message: "Username not found"
        };
    }

}

module.exports = new userService();