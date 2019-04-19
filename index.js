const User = require("./src/userClass");
const Admin = require("./src/adminClass");
const Orders = require("./src/oderClass");

//CREATE NEW USER HERE
const jane = new Admin("donald Doe", "cratg@gmail.com", "om123");
// const success = new User("success", "succesrg@gmail.com", "sw2fish");
// const thankGod = new User("thankGod", "preyfyg@gmail.com", "sw2fish");
// const grey = new User("grey", "grey123g@gmail.com", "sw2fish");

jane.readAllOrders();
// success.makeNewOrder("banana", "rice", "iphone");
// thankGod.makeNewOrder("banana", "rice", "iphone");
// grey.makeNewOrder("banana", "rice", "iphone");
