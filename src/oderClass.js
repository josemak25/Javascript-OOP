function Orders(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = null;
  this.order_id = null;
  this.timeOfOrder = productDate();
  this.dateOfOrder = productDate("date");

  const productDate = param => {
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
      return `${datePicker.getHours()}-${datePicker.getMinutes()}-${datePicker.getSeconds()}`;
    }
  };

  const orderData = this;

  createNewUser(orderData, "orderDATABASE");
}

module.exports = Orders;
