let users = [
    { username: "admin", password: "123", role: "admin" },
    { username: "staff", password: "345", role: "staff" },
    { username: "long", password: "567", role: "staff" },
    { username: "nam", password: "111", role: "guest" }
];

//check account login
function login(user, pass){
    for(let acc of users){
        if(acc.username === user && acc.password === pass){
            return acc;
        }
    }
    return null;
}

module.exports = {
    login
}