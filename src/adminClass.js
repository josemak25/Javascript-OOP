const User = require("./UserClass");
const { readAllUser } = require("./fs");

//CREATING THE USERCLASS CONSTRUCTOR
function Admin(name, email, password) {
  User.call(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUsers = () => {
  readAllUser();
};

Admin.prototype.deleteUser = user_id => {
  console.log("user delete succesfully");
};

Admin.prototype.deleteAllUsers = () => {
  console.log("all users are deleted");
};

module.exports = Admin;
