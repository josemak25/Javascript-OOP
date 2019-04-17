const fsReadAndWrite = require("./fs");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = null;
  this.is_admin = true;

  const userData = this;

  if (userData.constructor === User) userData.is_admin = false;

  fsReadAndWrite(userData, "userDATABASE");
}
module.exports = User;
