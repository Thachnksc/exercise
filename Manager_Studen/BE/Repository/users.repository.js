const prisma = require("../config/prisma");

class UserRepository{

    // get all user
    findAll() {
        return prisma.user.findMany({
            include: { role: true }
        });
    }


    // find by userName  
    findByUserName(userName) {
        return prisma.user.findUnique({
            where: { userName },
            include: { role: true }
        });
    }
   
    // findStudentsWithScore
    findStudentsWithScore() {
        return prisma.user.findMany({
            where: {
                role: { roleName: "student" } 
            },
            select: {
                userId: true,
                userName: true,
                role: {
                select: { roleName: true }
                },
                    scores: {
                    select: { score: true }
                }
            }
        });
    }

    // create student
    createStudent({ userId, userName, password }) { 
        return prisma.user.create({
        data: {
            userId,
            userName,
            password,
            role: {
            connect: { roleName: "student" }
            }
        }
        });
    }

    // get Score with total, max, min, avg 
    getScoreStats() {
        return prisma.scoreStudent.aggregate({
            _count: { score: true },
            _sum: { score: true },
            _max: { score: true },
            _min: { score: true },
            _avg: { score: true }
        });
    }

}

module.exports = new UserRepository();