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
  if (typeof user_id === "number") {
    return readSingleUser(user_id);
  } else return "Invalid Input, Input must be a number";
};

User.prototype.updateUserDetail = function(name, email, password) {
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return "Only string fields are allowed";
  } else if (name == "" || email == "" || password == "") {
    return "All fields are required";
  } else {
    const user_id = getUserId(this.email);
    return updateUser(name, email, password, (id = user_id));
  }
};

User.prototype.searchUser = username => {
  if (username.length <= 1) {
    return "Please input a name to search";
  } else if (typeof username !== "string") {
    return "Search field must be a string";
  }
  return searchUser(username);
};

User.prototype.makeNewOrder = function(...products) {
  const user_id = getUserId(this.email);
  if (products.length < 1) {
    return "Please make an order";
  }
  return Orders.prototype.createOrder(products, (id = user_id));
};

module.exports = User;
