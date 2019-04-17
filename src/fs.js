const fs = require("fs");

const url = fs.readFileSync("./db/dataBase.json", "utf8");

const dataBase = JSON.parse(url);

function createNewUser(data, dbPath) {
  // ADDING EVERY USER CREATED TO DATAASE

  // CHECK FOR USER EMAIL IN DATABASE TO KNOW IF SAME USER EXITS BEFORE ADDING USER TO DATABSE
  for (users of dataBase[dbPath]) {
    if (users.email === data.email) return console.log("User already exits");
  }

  // CHECK FOR USER ID IN DATABASE TO INCREMENT INCOMING USER ID
  dataBase[dbPath].length < 1
    ? (data.user_id = 1)
    : (data.user_id =
        dataBase[dbPath][dataBase[dbPath].length - 1].user_id + 1);

  //CHECK WHEN ALL IS DONE PUSH USER TO DATABASE
  dataBase[dbPath].push(data);

  //WRITE BACK OUR DATA TO DATABSE
  writeBackTodb();
  return console.log("user account created succesfully");
}

function writeBackTodb() {
  return fs.writeFileSync(
    "./db/dataBase.json",
    JSON.stringify(dataBase, null, 3),
    "utf8"
  );
}

//USER PROTOTYPE FUNCTIONS
function readSingleUser(userID) {
  const user = dataBase.userDATABASE.filter(user => user.user_id === userID);
  user.length < 1 ? console.log("FALSE, user not found") : console.log(user[0]);
}

//ADMIN PROTOTYPE FUNCTIONS
function readAllUser() {
  dataBase.userDATABASE.filter(users => console.log(users));
}

function searchUser(username) {
  const user = dataBase.userDATABASE.filter(user => user.name === username);
  user.length < 1 ? console.log("FALSE, user not found") : console.log(user[0]);
}

function deleteAllUser() {
  dataBase.userDATABASE = [];
  writeBackTodb();
  return console.log("database deleted succesfully");
}

module.exports = {
  createNewUser,
  readSingleUser,
  readAllUser,
  searchUser,
  deleteAllUser
};
