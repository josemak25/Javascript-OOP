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

  test("Admin method for single order", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.readSingleOrder(1)).toEqual({
      dateOfOrder: "Sat 20 Apr 2019",
      order_id: 1,
      orders: ["Rice", "Iphone"],
      timeOfOrder: "9:29 PM",
      user_id: 4
    });
  });

  test("Admin method for single order that dosent exit in database", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.readSingleOrder(4)).toEqual("FALSE, order not found");
  });

  test("Admin method for single order that input is not a number", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.readSingleOrder()).toEqual("Input must be a number");
    expect(jane.readSingleOrder("")).toEqual("Input must be a number");
  });

  test("Admin method for update order that input is not a valid type", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.updateOrder("", "")).toEqual(
      "Product fields must be a string and ID a number"
    );
  });

  test("Admin method for update order that order id is not found", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.updateOrder("Samsung", "Plantain", 4)).toEqual(
      "FALSE, order not found"
    );
  });

  test("Admin method for update order, when order id is found", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.updateOrder("Samsung", "Plantain", 2)).toEqual({
      user_id: 4,
      order_id: 2,
      timeOfOrder: "12:03 AM",
      dateOfOrder: "Sat 20 Apr 2019",
      orders: ["Plantain", "Iphone"]
    });
  });

  test("Admin method for delete order that order id is not found", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteOrder(4)).toEqual("FALSE, order not found");
  });

  test("Admin method for delete order that order id is not a number", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteOrder("")).toEqual("Input must be of a number type");
  });

  test("Admin method for delete order that order id is valid and found", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteOrder(2)).toEqual("Order deleted succesful...");
  });

  test("Admin method for delete all orders from DB", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteAllOrder()).toEqual("Order database deleted succesfully");
  });

  test("Admin method to delete a user by ID when input of ID is invalid", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    jane.readAllUsers();
    expect(jane.deleteUser("")).toEqual("Input must be a number");
  });

  test("Admin method to delete a user by ID when input of ID is valid but not found in DB", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteUser(10)).toEqual("FALSE, user not found");
  });

  test("Admin method to delete a user by ID when input of ID is valid and found in DB", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    jane.saveUser();
    expect(jane.deleteUser(5)).toEqual("User deleted succesful...");
  });

  test("Admin method to delete all users in DB", () => {
    const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
    expect(jane.deleteAllUsers()).toEqual("User database deleted succesfully");
  });
});
