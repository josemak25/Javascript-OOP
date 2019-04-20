const User = require("./UserClass");
const Orders = require("./oderClass");

const { readAllUser, deleteAllUser, deleteUser } = require("./fs_rw");

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
  deleteUser(user_id);
};

Admin.prototype.deleteAllUsers = () => {
  deleteAllUser();
};

Admin.prototype.readAllOrders = () => {
  Orders.prototype.readAllOrders();
};

Admin.prototype.readSingleOrder = orderId => {
  Orders.prototype.readSingleOrder(orderId);
};

Admin.prototype.deleteOrder = orderId => {
  Orders.prototype.deleteOrder(orderId);
};

Admin.prototype.deleteAllOrder = () => {
  Orders.prototype.deleteAllOrder();
};

User.prototype.updateOrder = function(prodToUpdate, newProduct, orderId) {
  
  Orders.prototype.updateOrderDetails(prodToUpdate, newProduct, orderId);
};
module.exports = Admin;
