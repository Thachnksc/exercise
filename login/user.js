const db = require("./db");

async function login(username, password) {
    const[row] = await db.query( "SELECT * FROM users WHERE username=? AND password=?", [username, password]);
    if (row.length === 0) {
        return null;
    }
    return row[0];
}


module.exports = {
    login
}