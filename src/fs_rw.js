const fs = require("fs");

const url = fs.readFileSync("./db/dataBase.json", "utf8");

const dataBase = JSON.parse(url);

//WRITE TO DB
function writeBackTodb() {
  return fs.writeFileSync(
    "./db/dataBase.json",
    JSON.stringify(dataBase, null, 3),
    "utf8"
  );
}

function addToDataBase(data, dbPath) {
  // CHECK FOR DATABSE PATH BEFORE ADDING TO DATABSE
  if (dbPath === "userDATABASE") {
    dataBase.userDATABASE.push(data);
    console.log("user account created succesfully");
  } else {
    dataBase.orderDATABASE.push(data);
    console.log("orders succesfully made");
  }

  //WRITE BACK OUR DATA TO DATABSE
  writeBackTodb();
}

// UPDATING USER DETAILS ON DB
function getUserId(email) {
  const user = dataBase.userDATABASE.find(user => user.email == email);
  return user.user_id;
}

//USER PROTOTYPE FUNCTIONS
function readSingleUser(userID) {
  const user = dataBase.userDATABASE.find(user => user.user_id == userID);
  user ? console.log(user) : console.log("FALSE, user not found");
}

function searchUser(username) {
  const user = dataBase.userDATABASE.filter(user => user.name == username);
  user.length < 1
    ? console.log("FALSE, user not found")
    : console.log(
        `Found ${user.length} users with the name ${username}`,
        ...user
      );
}

function updateUser(name, email, password, id) {
  const user = dataBase.userDATABASE.find(user => user.user_id == id);
  if (user.name == name && user.email == email && user.password == password) {
    return console.log("No changes where made..");
  } else {
    user.name = name;
    user.email = email;
    user.password = password;
  }
  console.log("User updated succesfully");
  writeBackTodb();
}

//ADMIN PROTOTYPE FUNCTIONS
function readAllUser() {
  dataBase.userDATABASE.filter(users => console.log(users));
}

function deleteUser(userID) {
  const user = dataBase.userDATABASE.find(user => user.user_id == userID);
  console.log(user);
  dataBase.userDATABASE.splice(userID - 1, 1);
  console.log(dataBase.userDATABASE);
  console.log("User deleted succesful...");
  writeBackTodb();
}

function deleteAllUser() {
  dataBase.userDATABASE = [];
  console.log("user database deleted succesfully");
  writeBackTodb();
  return;
}

//ORDER PROTOTYPE

function readAllOrders() {
  dataBase.orderDATABASE.filter(orders => console.log(orders));
}

function readSingleOrder(orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  order ? console.log(order) : console.log("FALSE, order not found");
}

function deleteOrder(orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  console.log(order);
  dataBase.orderDATABASE.splice(orderId - 1, 1);
  console.log(dataBase.orderDATABASE);
  console.log("order deleted succesful...");
  writeBackTodb();
}

function deleteAllOrder() {
  dataBase.orderDATABASE = [];
  console.log("order database deleted succesfully");
  writeBackTodb();
}

function updateOrderDetails(prodToUpdate, newProduct, orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  if (order) {
    order.orders.map((item, index) => {
      if (item == prodToUpdate) {
        order.orders[index] = newProduct;
      }
    });
  } else {
    return console.log("FALSE, order not found");
  }

  console.log("Order updated succesfully");
  writeBackTodb();
}

module.exports = {
  addToDataBase,
  readSingleUser,
  readAllUser,
  searchUser,
  deleteAllUser,
  deleteUser,
  updateUser,
  getUserId,
  readAllOrders,
  readSingleOrder,
  deleteOrder,
  deleteAllOrder,
  updateOrderDetails
};
