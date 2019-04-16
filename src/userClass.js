const fs = require("fs");

function User(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);

  const userData = this;

  // ADDING EVERY USER CREATED TO DATAASE
  try {
    const dbResponse = fs.readFileSync("./db/dataBase.json", "utf8");
    const dataBase = JSON.parse(dbResponse);
    // console.log(dataBase);

    // for (users of dataBase.userDATABASE) {
    //   if (users.email === userData.email) {
    //     return console.log("User already exits");
    //   }
    // }
    dataBase.userDATABASE.push(userData);
    console.log(dataBase);

    fs.writeFileSync(
      "./db/dataBase.json",
      JSON.stringify(dataBase, null, 2),
      "utf8"
    );
  } catch (error) {
    return new Error("sorry could not find file path");
  }
}
module.exports = User;
