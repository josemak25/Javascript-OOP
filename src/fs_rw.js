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

//GENERATE USERID

function generateUserId() {
  if (dataBase.userDATABASE.length < 1) {
    return 1;
  } else {
    return dataBase.userDATABASE[dataBase.userDATABASE.length - 1].user_id + 1;
  }
}

function addToDataBase(data, dbPath) {
  // CHECK FOR DATABSE PATH BEFORE ADDING TO DATABSE
  if (dbPath === "userDATABASE") {
    dataBase.userDATABASE.push(data);
    writeBackTodb();
    return "user account created succesfully";
  } else {
    dataBase.orderDATABASE.push(data);
    writeBackTodb();
    return "orders succesfully made";
  }
}

// UPDATING USER DETAILS ON DB
function getUserId(email) {
  const user = dataBase.userDATABASE.find(user => user.email == email);
  return user.user_id;
}

//USER PROTOTYPE FUNCTIONS
function readSingleUser(userID) {
  const user = dataBase.userDATABASE.find(user => user.user_id == userID);
  return user ? user : "FALSE, user not found";
}

function searchUser(username) {
  const user = dataBase.userDATABASE.find(user => user.name == username);
  return user ? user : "FALSE, no user by such name is not found";
}

function updateUser(name, email, password, id) {
  const user = dataBase.userDATABASE.find(user => user.user_id == id);
  if (user.name == name && user.email == email && user.password == password) {
    return "No changes where made..";
  } else {
    user.name = name;
    user.email = email;
    user.password = password;
  }
  writeBackTodb();
  return "User updated succesfully";
}

//ADMIN PROTOTYPE FUNCTIONS
function readAllUser() {
  return dataBase.userDATABASE.filter(users => users);
}

function deleteUser(userID) {
  let deleteIndex = 0;
  const user = dataBase.userDATABASE.find((user, index) => {
    if (user.user_id == userID) {
      deleteIndex = index;
      return user;
    }
  });
  if (user) {
    dataBase.userDATABASE.splice(deleteIndex, 1);
    writeBackTodb();
    return "user deleted succesful...";
  } else {
    return "FALSE, order not found";
  }
}

function deleteAllUser() {
  dataBase.userDATABASE = [];
  writeBackTodb();
  return "user database deleted succesfully";
}

//ORDER PROTOTYPE

function readAllOrders() {
  return dataBase.orderDATABASE.find(orders => orders);
}

function readSingleOrder(orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  return order ? order : "FALSE, order not found";
}

function deleteOrder(orderId) {
  let deleteIndex = 0;
  const order = dataBase.orderDATABASE.find((order, index) => {
    if (order.order_id == orderId) {
      deleteIndex = index;
      return order;
    }
  });
  if (order) {
    dataBase.orderDATABASE.splice(deleteIndex, 1);
    writeBackTodb();
    return "order deleted succesful...";
  } else return "FALSE, order not found";
}

function deleteAllOrder() {
  dataBase.orderDATABASE = [];
  writeBackTodb();
  return "order database deleted succesfully";
}

function updateOrderDetails(prodToUpdate, newProduct, orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  if (order) {
    order.orders.map((item, index) => {
      if (item == prodToUpdate) {
        order.orders[index] = newProduct;
        writeBackTodb();
      }
    });
  } else {
    return "FALSE, order not found";
  }
  return order;
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
  updateOrderDetails,
  generateUserId
};
