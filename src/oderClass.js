const { addToDataBase, getUserId } = require("./fs_rw");

function Orders(...products) {
  this.user_id = getUserId(this.email);
  this.order_id = 1;
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
      return `${datePicker.getHours()}-${datePicker.getMinutes()}-${datePicker.getSeconds()} GMT+0100`;
    }
  }

  const orderData = this;

  addToDataBase(orderData, "orderDATABASE");
}

module.exports = Orders;
