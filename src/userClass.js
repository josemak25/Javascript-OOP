const {
  createNewUser,
  readSingleUser,
  searchUser,
  updateUserDetail
} = require("./fs");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = null;
  this.is_admin = true;

  const userData = this;

  if (userData.constructor === User) userData.is_admin = false;

  createNewUser(userData, "userDATABASE");
}

User.prototype.readUserById = user_id => {
  readSingleUser(user_id);
};

User.prototype.updateUserDetail = (id, name, email, password) => {
  updateUserDetail(id, name, email, password);
};

User.prototype.searchUser = username => {
  searchUser(username);
};

module.exports = User;
