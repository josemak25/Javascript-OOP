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
  return readAllUser();
};

Admin.prototype.deleteUser = user_id => {
  if (typeof user_id === "number") {
    return deleteUser(user_id);
  } else return "Input must be a number";
};

Admin.prototype.deleteAllUsers = () => {
  return deleteAllUser();
};

Admin.prototype.readAllOrders = () => {
  return Orders.prototype.readAllOrders();
};

Admin.prototype.readSingleOrder = orderId => {
  if (typeof orderId === "number") {
    return Orders.prototype.readSingleOrder(orderId);
  } else {
    return "Input must be a number";
  }
};

Admin.prototype.deleteOrder = orderId => {
  if (typeof orderId === "number") {
    return Orders.prototype.deleteOrder(orderId);
  } else {
    return "Input must be of a number type";
  }
};

Admin.prototype.deleteAllOrder = () => {
  return Orders.prototype.deleteAllOrder();
};

User.prototype.updateOrder = function(prodToUpdate, newProduct, orderId) {
  if (
    typeof prodToUpdate === "string" &&
    typeof newProduct === "string" &&
    typeof orderId === "number"
  ) {
    return Orders.prototype.updateOrderDetails(
      prodToUpdate,
      newProduct,
      orderId
    );
  } else return "Product fields must be a string and ID a number";
};
module.exports = Admin;
