const User = require("./UserClass");

//CREATING THE USERCLASS CONSTRUCTOR
function Admin(name, email, password) {
  User.call(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUsers = () => {
  console.log("this are all your user datas");
};

Admin.prototype.deleteUser = user_id => {
  console.log("user delete succesfully");
};

Admin.prototype.deleteAllUsers = () => {
  console.log("all users are deleted");
};

const andy = new User("Andy Doe", "Andydddcg@gmail.com", "sword32fish");
