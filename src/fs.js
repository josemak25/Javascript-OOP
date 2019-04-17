const fs = require("fs");

function createNewUser(data, dbPath) {
  // ADDING EVERY USER CREATED TO DATAASE
  const url = fs.readFileSync("./db/dataBase.json", "utf8");
  const dataBase = JSON.parse(url);

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
  fs.writeFileSync(
    "./db/dataBase.json",
    JSON.stringify(dataBase, null, 3),
    "utf8"
  );
  return console.log("user account created succesfully");
}

module.exports = createNewUser;
