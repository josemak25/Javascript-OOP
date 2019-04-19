const fs = require("fs");

const Orders = require("./oderClass");

const {
  addToDataBase,
  readSingleUser,
  searchUser,
  updateUser,
  getUserId
} = require("./fs_rw");

function User(name, email, password) {
  const url = fs.readFileSync("./db/dataBase.json", "utf8");
  const dataBase = JSON.parse(url);

  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = generateUserId();
  this.is_admin = true;
  let userData = this;

  function generateUserId() {
    if (dataBase.userDATABASE.length < 1) {
      return 1;
    } else {
      return (
        dataBase.userDATABASE[dataBase.userDATABASE.length - 1].user_id + 1
      );
    }
  }

  for (users of dataBase.userDATABASE) {
    if (users.email === userData.email)
      return console.log("User already exits");
  }

  if (userData.constructor === User) userData.is_admin = false;

  addToDataBase(userData, "userDATABASE");
}

User.prototype.readUserById = user_id => {
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
