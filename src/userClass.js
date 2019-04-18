const fs = require("fs");

const {
  createNewUser,
  readSingleUser,
  searchUser,
  updateUser
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

  if (userData.constructor === User) userData.is_admin = false;

  createNewUser(userData, "userDATABASE");
}

User.prototype.readUserById = user_id => {
  readSingleUser(user_id);
};

User.prototype.updateUserDetail = function(name, email, password) {
  updateUser(name, email, password);
};

User.prototype.searchUser = username => {
  searchUser(username);
};

module.exports = User;
