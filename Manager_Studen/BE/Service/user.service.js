const userRepository = require("../Repository/user.repository");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY=fj3S!8df9A@#123kdls9s0dk";

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
            { userId: user.userId },
            SECRET_KEY,
            {expiresIn: "1h"}
        );
        return { user, token };
    }

    // Get all user
    async getAllUser(){
        return await userRepository.findAll();
    }

}

module.exports = new userService();