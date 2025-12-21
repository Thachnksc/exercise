const pool = require("../config/db");
const User = require("../Models/user.model");

class UserRepository{

    // get all user
    async findAll(){
        const [row] = await pool.query("SELECT * FROM user");
        const list = [];
        for (let i = 0; i < row.length; i++){
            list.push(new User(row[i]));
        }
        return list;
    }

    // find by userName
    async findByName(userName){
        const [row] = await pool.query("SELECT * FROM user WHERE userName = ?", [userName]);
        if (row.length > 0){
            return new User(row[0]);
        } else {
            return null;
        }
    }

    // create user
    async createUser(user){
        const {userId, userName, password, roleId} = user;
        await pool.query("INSERT INTO user (userID, userName, password, roleId) VALUES (?, ?, ?, ?)", [userId, userName, password, roleId]);
        return user;
    }
}

module.exports = new UserRepository();