const memberClass = require("./memberClass");

//CREATING THE USERCLASS CONSTRUCTOR
function Admin(name, email, password) {
  memberClass.call(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
Admin.prototype = Object.create(memberClass.prototype);
Admin.prototype.constructor = Admin;

const andy = new Admin("Andy Doe", "Andy@gmail.com", "sword32fish");
