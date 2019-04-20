const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const User = require("../src/userClass");

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

  test("Testing user class method if the input of a user on creation is valid", () => {
    const jane = new User(12, "jose", "");
    expect(jane.saveUser()).toEqual("Only string fields are allowed");
  });

  test("Testing user class method if the input of a user is empty", () => {
    const jane = new User("", "", "");
    expect(jane.saveUser()).toMatch("All fields are required");
  });

  test("Creating a new user with a mail that matches an exiting user email", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.saveUser()).toMatch("User already exits");
  });

  test("Search a user by id ", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.readUserById(2)).toEqual({
      name: "victor",
      email: "zinag@gmail.com",
      password: "om123",
      user_id: 2,
      is_admin: false
    });
  });

  test("Search a user id with invalid input ", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.readUserById("")).toMatch(
      "Invalid Input, Input must be a number"
    );
  });

  test("Search a user by id ", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.readUserById(8)).toMatch("FALSE, user not found");
  });
});
