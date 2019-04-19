const fs = require("fs");

const url = fs.readFileSync("./db/dataBase.json", "utf8");

const dataBase = JSON.parse(url);

//WRITE TO DB
function writeBackTodb() {
  return fs.writeFileSync(
    "./db/dataBase.json",
    JSON.stringify(dataBase, null, 4),
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
  return;
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
  writeBackTodb();
  console.log("User updated succesfully");
}

//ADMIN PROTOTYPE FUNCTIONS
function readAllUser() {
  dataBase.userDATABASE.filter(users => console.log(users));
}

function deleteUser(userID) {
  const user = dataBase.userDATABASE.find(user => user.user_id == userID);
  dataBase.userDATABASE.splice(userID, 1);
  console.log(user.name, "  user deleted succesful...");
  writeBackTodb();
}

function deleteAllUser() {
  dataBase.userDATABASE = [];
  writeBackTodb();
  return console.log("database deleted succesfully");
}

//ORDER PROTOTYPE

function readAllOrders() {
  dataBase.orderDATABASE.filter(orders => console.log(orders));
}

function readSingleOrder(orderId) {
  const order = dataBase.orderDATABASE.find(order => order.order_id == orderId);
  order ? console.log(order) : console.log("FALSE, order not found");
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
  readSingleOrder
};
