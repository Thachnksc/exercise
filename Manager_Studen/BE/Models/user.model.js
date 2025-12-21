class User {
    constructor({userId, userName, password, roleId}){
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.roleId = roleId;
    }
}

module.exports = User;
