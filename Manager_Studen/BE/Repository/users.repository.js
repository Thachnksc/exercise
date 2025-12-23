const pool = require("../config/db");
const User = require("../Models/users.model");

class UserRepository{

    // get all user
    async findAll(){
        const [row] = await pool.query("SELECT * FROM users");
        const list = [];
        for (let i = 0; i < row.length; i++){
            list.push(new User(row[i]));
        }
        return list;
    }

    // find by userName
    async findByName(userName){
        const [row] = await pool.query(`
            SELECT 
                u.userId,
                u.userName,
                u.password,
                u.roleId,
                r.roleName 
            FROM users u
            LEFT JOIN role r 
                ON u.roleId = r.roleId
            WHERE u.userName = ?`, [userName]
        );
        if (row.length > 0){
            return row[0];  
        } 
        return null;
    }

    // 
    async findStudentScore() {
        const [rows] = await pool.query(`
            SELECT 
                u.userId,
                u.userName,
                r.roleName,
                s.score
            FROM users u
            INNER JOIN role r 
                ON u.roleId = r.roleId AND r.roleName = 'student'
            LEFT JOIN score_student s 
                ON u.userId = s.userId
        `);
        return rows;
    }

    // create student
    async createStudent({ userId, userName, password }) {
        await pool.query(`
            INSERT INTO users (userId, userName, password, roleId)
            VALUES (?, ?, ?, ?)`, [userId, userName, password, 2]);
    return { userId, userName };
    }


    // get Score with total, max, min, avg 
    async getScoreStatsRepo() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(s.score) AS total_students_have_score,
                SUM(s.score) AS total_score,
                MAX(s.score) AS max_score,
                MIN(s.score) AS min_score,
                AVG(s.score) AS avg_score
            FROM score_student s
        `);

        return rows[0];
    }

}

module.exports = new UserRepository();