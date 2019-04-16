const fs = require("fs");

function Member(name, email, password) {
  (this.name = name), (this.email = email), (this.password = password);

  const userData = this;
  // ADDING EVERY USER CREATED TO DATAASE
  fs.readFile("./db/dataBase.json", "utf8", (err, res) => {
    if (err) throw new Error("sorry could not find file path");
    const dataBase = JSON.parse(res);
    for (users of dataBase.userDATABASE) {
      if (users.email === userData.email) {
        return console.log("User already exits");
      }
    }
    dataBase.userDATABASE.push(userData);

    fs.writeFile(
      "./db/dataBase.json",
      JSON.stringify(dataBase, null, 4),
      "utf8",
      err => {
        if (err) throw err;
        return console.log("user account created succesfully");
      }
    );
  });
}
module.exports = Member;
