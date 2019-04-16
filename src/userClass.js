const memberClass = require("./memberClass");

//CREATING THE USERCLASS CONSTRUCTOR
function User(name, email, password) {
  memberClass(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
User.prototype = Object.create(memberClass.prototype);
User.prototype.constructor = User;
