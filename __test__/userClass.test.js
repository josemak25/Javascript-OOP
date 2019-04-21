const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const User = require("../src/userClass");

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

  test("Make order as a user with no input fileds", () => {
    const jane = new User("richard", "richardTutu@gmail.com", "omen2324");
    expect(jane.makeNewOrder()).toEqual("Please make an order");
  });

  test("Make order as a user", () => {
    const jane = new User("richard", "richardTutu@gmail.com", "omen2324");
    const orderedStuffs = jane.makeNewOrder("Rice", "Iphone");

    expect(orderedStuffs).toEqual(orderedStuffs);

    expect(Array.isArray(dataBase.orderDATABASE)).toEqual(true);
    dataBase.orderDATABASE.forEach(order => {
      // Ensure each order is an object with an exact set of keys
      expect(typeof order).toEqual("object");
      expect(Object.keys(order).sort()).toEqual([
        "dateOfOrder",
        "order_id",
        "orders",
        "timeOfOrder",
        "user_id"
      ]);
      // Validate simple property types.
      expect(typeof order.dateOfOrder).toEqual("string");
      expect(typeof order.order_id).toEqual("number");
      expect(typeof order.timeOfOrder).toEqual("string");
      expect(typeof order.user_id).toEqual("number");

      // Ensure that the order property is an array of strings.
      expect(Array.isArray(order.orders)).toEqual(true);
      order.orders.forEach(item => {
        expect(typeof item).toEqual("string");
      });
    });
  });

  test("Update User details with same fields and no changes", () => {
    const jane = new User("richard", "richardTutu@gmail.com", "omen2324");
    expect(
      jane.updateUserDetail("richard", "richardTutu@gmail.com", "omen2324")
    ).toMatch("No changes where made..");
  });

  test("Update User details", () => {
    const jane = new User("richard", "richardTutu@gmail.com", "omen2324");
    expect(
      jane.updateUserDetail("richmond", "richmang@gmail.com", "omen")
    ).toEqual("User updated succesfully");
  });
});
