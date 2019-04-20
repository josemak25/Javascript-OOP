const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const User = require("../src/userClass");

const {
  addToDataBase,
  readSingleUser,
  searchUser,
  updateUser,
  getUserId
} = require("../src/fs_rw");

//Testing UserClass and UserClass methods
describe("Testing user class methods", () => {
  test("should create new user when userClass is called", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(dataBase.userDATABASE).toContainEqual(
      expect.objectContaining({
        email: "cratrideag@gmail.com",
        name: "donald Doe",
        password: "om123"
      })
    );
  });

  test()
});
