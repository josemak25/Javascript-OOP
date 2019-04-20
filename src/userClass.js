const fs = require("fs");

const Orders = require("./oderClass");

const {
  addToDataBase,
  readSingleUser,
  searchUser,
  updateUser,
  getUserId,
  generateUserId
} = require("./fs_rw");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = generateUserId();
  this.is_admin = true;
}

User.prototype.saveUser = function() {
  const url = fs.readFileSync("./db/dataBase.json", "utf8");
  const dataBase = JSON.parse(url);
  const userData = this;

  if (
    typeof userData.name !== "string" ||
    typeof userData.email !== "string" ||
    typeof userData.password !== "string"
  ) {
    return "Only string fields are allowed";
  } else if (
    userData.name == "" ||
    userData.email == "" ||
    userData.password == ""
  ) {
    return "All fields are required";
  }

  for (users of dataBase.userDATABASE) {
    if (users.email === userData.email) return "User already exits";
  }

  if (userData.constructor === User) userData.is_admin = false;

  addToDataBase(userData, "userDATABASE");
};

User.prototype.readUserById = function(user_id) {
  readSingleUser(user_id);
};

User.prototype.updateUserDetail = function(name, email, password) {
  const user_id = getUserId(this.email);
  updateUser(name, email, password, (id = user_id));
};

User.prototype.searchUser = username => {
  searchUser(username);
};

User.prototype.makeNewOrder = function(...products) {
  const user_id = getUserId(this.email);
  Orders.prototype.createOrder(products, (id = user_id));
};

module.exports = User;
