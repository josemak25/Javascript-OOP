const memberClass = require("./memberClass");

//CREATING THE USERCLASS CONSTRUCTOR
function User(name, email, password) {
  memberClass.call(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
User.prototype = Object.create(memberClass.prototype);
User.prototype.constructor = User;

const joe = new User("meme Ken", "meme@gmail.com", "swordfish");
