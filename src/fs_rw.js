const fs = require("fs");

const url = fs.readFileSync("./db/dataBase.json", "utf8");

const dataBase = JSON.parse(url);

//WRITE TO DB
function writeBackTodb() {
  return fs.writeFileSync(
    "./db/dataBase.json",
    JSON.stringify(dataBase, null, 2),
    "utf8"
  );
}

function createNewUser(data, dbPath) {
  // ADDING EVERY USER CREATED TO DATAASE

  // CHECK FOR USER EMAIL IN DATABASE TO KNOW IF SAME USER EXITS BEFORE ADDING USER TO DATABSE
  for (users of dataBase[dbPath]) {
    if (users.email === data.email) return console.log("User already exits");
  }

  //CHECK WHEN ALL IS DONE PUSH USER TO DATABASE
  dataBase[dbPath].push(data);

  //WRITE BACK OUR DATA TO DATABSE
  writeBackTodb();
  return console.log("user account created succesfully");
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
  console.log("user id ", id);
  let user = dataBase.userDATABASE.find(user => user.user_id == id);
  // console.log(user);
  // if (user.name == name && user.email == email && user.password == password) {
  //   return console.log("No changes where made..");
  // } else {
  //   user.name = name;
  //   user.email = email;
  //   user.password = password;
  // }
  // writeBackTodb();
  // console.log("User updated succesfully");
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

module.exports = {
  createNewUser,
  readSingleUser,
  readAllUser,
  searchUser,
  deleteAllUser,
  deleteUser,
  updateUser
};
