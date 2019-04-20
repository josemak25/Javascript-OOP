const fs = require("fs");

const {
  addToDataBase,
  readAllOrders,
  readSingleOrder,
  deleteOrder,
  deleteAllOrder,
  updateOrderDetails
} = require("./fs_rw");

function Orders(products, id) {
  const url = fs.readFileSync("./db/dataBase.json", "utf8");
  const dataBase = JSON.parse(url);
  this.user_id = id;
  this.order_id = generateOrderId();
  this.timeOfOrder = productDate();
  this.dateOfOrder = productDate("date");
  this.orders = products;

  function productDate(param) {
    const datePicker = new Date();
    if (param == "date") {
      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        datePicker.getDay()
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ][datePicker.getMonth()];
      datePicker.getFullYear();
      return `${weekday} ${datePicker.getUTCDate()} ${months} ${datePicker.getFullYear()}`;
    } else {
      return datePicker.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
    }
  }

  function generateOrderId() {
    if (dataBase.orderDATABASE.length < 1) {
      return 1;
    } else {
      return (
        dataBase.orderDATABASE[dataBase.orderDATABASE.length - 1].order_id + 1
      );
    }
  }

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
