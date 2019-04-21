const fs = require("fs");

const {
  addToDataBase,
  readAllOrders,
  readSingleOrder,
  deleteOrder,
  deleteAllOrder,
  updateOrderDetails,
  idGenerator,
  productDate
} = require("./fs_rw");

function Orders(products, id) {
  this.user_id = id;
  this.order_id = idGenerator("orderDATABASE", "order_id");
  this.timeOfOrder = productDate();
  this.dateOfOrder = productDate("date");
  this.orders = products;

  const orderData = this;

  addToDataBase(orderData, "orderDATABASE");
}

Orders.prototype.createOrder = function(products) {
  return new Orders(products, id);
};

Orders.prototype.readAllOrders = () => {
  return readAllOrders();
};

Orders.prototype.readSingleOrder = orderId => {
  return readSingleOrder(orderId);
};

Orders.prototype.deleteOrder = orderId => {
  return deleteOrder(orderId);
};

Orders.prototype.deleteAllOrder = () => {
  return deleteAllOrder();
};

Orders.prototype.updateOrderDetails = function(
  prodToUpdate,
  newProduct,
  orderId
) {
  return updateOrderDetails(prodToUpdate, newProduct, orderId);
};

module.exports = Orders;
