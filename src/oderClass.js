const fs = require("fs");

const { addToDataBase } = require("./fs_rw");

function Orders(...products) {
  const url = fs.readFileSync("./db/dataBase.json", "utf8");
  const dataBase = JSON.parse(url);

  this.user_id = 1;
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
      return `${weekday}-${months}-${datePicker.getFullYear()}`;
    } else {
      return `${datePicker.getHours()}:${datePicker.getMinutes()} AM`;
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

module.exports = Orders;
