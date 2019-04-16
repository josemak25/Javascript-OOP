const fs = require("fs");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);
  this.user_id = null;

  const userData = this;

  // ADDING EVERY USER CREATED TO DATAASE
  try {
    const dbResponse = fs.readFileSync("./db/dataBase.json", "utf8");
    const dataBase = JSON.parse(dbResponse);
    const checkUserDatabse = dataBase.userDATABASE;
    const checkAdminDatabse = dataBase.userDATABASE;

    //CHECK FOR USER EMAIL IN DATABASE TO KNOW IF SAME USER EXITS BEFORE ADDING USER TO DATABSE
    for (users of checkUserDatabse) {
      if (users.email === userData.email)
        return console.log("User already exits");
    }

    //CHECK FOR USER ID IN DATABASE TO INCREMENT INCOMING USER ID
    checkUserDatabse.length < 1
      ? (userData.user_id = 1)
      : (userData.user_id =
          checkUserDatabse[dataBase.userDATABASE.length - 1].user_id + 1);

    //CHECK WHEN ALL IS DONE PUSH USER TO DATABASE
    dataBase.userDATABASE.push(userData);

    //WRITE BACK OUR DATA TO DATABSE
    fs.writeFileSync(
      "./db/dataBase.json",
      JSON.stringify(dataBase, null, 2),
      "utf8"
    );
    return console.log("user account created succesfully");
  } catch (error) {
    return new Error("sorry could not find file path");
  }
}
module.exports = User;
