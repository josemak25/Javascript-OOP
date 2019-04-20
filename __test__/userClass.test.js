const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const User = require("../src/userClass");
const { getUserId } = require("../src/fs_rw");

//Testing UserClass and UserClass methods
describe("Testing user class methods", () => {
  test("should create new user when userClass is called", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
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

  test("Search a user by name with an invalid input of number", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.searchUser("bryan finch")).toEqual({
      name: "bryan finch",
      email: "bryanFinchg@gmail.com",
      password: "om123",
      user_id: 3,
      is_admin: false
    });
  });

  test("Search a user by name with an invalid input of number", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.searchUser(5)).toMatch("Search field must be a string");
  });

  test("Search a user by name with an invalid input of empty string", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.searchUser("")).toMatch("Please input a name to search");
  });
  test("Search a user by name with a name that dosent exit in database", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.searchUser("Jospeh")).toMatch(
      "FALSE, no user by such name is not found"
    );
  });

  test("Update User details test with invalid cases of input", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.updateUserDetail(56, "76")).toMatch(
      "Only string fields are allowed"
    );
  });

  test("Update User details test with empty fields", () => {
    const jane = new User("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.updateUserDetail("", "", "")).toMatch(
      "All fields are required"
    );
  });

  test("Update User details with same fields and no changes", () => {
    const jane = new User("richmond", "richmang@gmail.com", "omen");
    expect(
      jane.updateUserDetail("richmond", "richmang@gmail.com", "omen")
    ).toMatch("No changes where made..");
  });

  test("Update User details", () => {
    const jane = new User("richmond", "richmang@gmail.com", "omen");
    expect(
      jane.updateUserDetail("richard", "richardTutu@gmail.com", "omen2324")
    ).toEqual("User updated succesfully");
  });
});
