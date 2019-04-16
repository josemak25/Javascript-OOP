const fsReadAndWrite = require("./fs");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = null;

  const userData = this;

  const dataBase = {
    userDATABASE: "userDATABASE",
    adminDATABASE: "adminDATABASE"
  };

  userData.constructor === User
    ? fsReadAndWrite(userData, dataBase.userDATABASE)
    : fsReadAndWrite(userData, dataBase.adminDATABASE);
}
module.exports = User;
