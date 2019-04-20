const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const Admin = require("../src/adminClass");

//Testing UserClass and UserClass methods
describe("Testing admin class methods", () => {
  test("should create admin when adminClass is called", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(Array.isArray(dataBase.userDATABASE)).toEqual(true);
    dataBase.userDATABASE.forEach(user => {
      // Ensure each order is an object with an exact set of keys
      expect(typeof user).toEqual("object");
      expect(Object.keys(user).sort()).toEqual([
        "email",
        "is_admin",
        "name",
        "password",
        "user_id"
      ]);
      // Validate simple property types.
      expect(typeof user.email).toEqual("string");
      expect(typeof user.is_admin).toEqual("boolean");
      expect(typeof user.name).toEqual("string");
      expect(typeof user.password).toEqual("string");
      expect(typeof user.user_id).toEqual("number");
    });
  });

  test("Admin method to read all users", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    const dataOfUsers = jane.readAllUsers();
    expect(jane.readAllUsers()).toEqual(dataOfUsers);
  });

  test("Admin method to read all orders", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    const dataOfOrders = jane.readAllOrders();
    expect(jane.readAllOrders()).toEqual(dataOfOrders);
  });

  //   test("Admin method to delete a user", () => {
  //     const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
  //     jane.saveUser();
  //     jane.readAllUsers();
  //     const dataOfUsers = jane.deleteUser();
  //     expect(jane.deleteUser()).toEqual(dataOfUsers);
  //   });

  //   test("Admin method to delete all users", () => {
  //     const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
  //     jane.saveUser();
  //     const dataOfUsers = jane.deleteUser();
  //     expect(jane.deleteUser()).toEqual(dataOfUsers);
  //   });
});
