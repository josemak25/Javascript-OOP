const UserClass = require("./userClass");

//CREATING THE USERCLASS CONSTRUCTOR
function Admin(name, email, password) {
  UserClass.call(this, name, email, password);
}

//SETTING THE USERCLASS A SUBCLASS OF MEMBERCLASS
Admin.prototype = Object.create(UserClass.prototype);
Admin.prototype.constructor = Admin;

const andy = new Admin("Andy Doe", "Andy@gmail.com", "sword32fish");
const joe = new Admin("meme Ken", "meme@mail.com", "swordfish");
const dan = new Admin("meme Ken", "mememail.com", "swordfish");
const dan2 = new Admin("meme Ken", "meme@mil.com", "swordfish");
const dan3 = new UserClass("meme Ken", "meme@mail.om", "swordfish");
const dan4 = new UserClass("meme Ken", "meme@mail.c", "swordfish");
const dan5 = new UserClass("meme Ken", "mmail.com", "swordfish");
