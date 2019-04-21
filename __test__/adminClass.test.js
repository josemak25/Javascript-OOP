const fs = require("fs");
const url = fs.readFileSync("./db/dataBase.json", "utf8");
const dataBase = JSON.parse(url);
const Admin = require("../src/adminClass");

//USERS FOR TESTING
const jane = new Admin("donald Doe", "cratrideag@gmail.com", "om123");
const king = new Admin("express king", "crownstar@gmail.com", "passleav");
const james = new Admin("Star Boy", "vitamalta@gmail.com", "clarktown");
jane.saveUser();
king.saveUser();
james.saveUser();

//ORDERS FOR TESTING
jane.makeNewOrder("Samsung", "Plantain");
jane.makeNewOrder("Vita Milk", "PS4 GamePad");
jane.makeNewOrder("bread", "milk");
jane.makeNewOrder("butter cake", "headphone");

//Testing UserClass and UserClass methods
describe("Testing admin class methods", () => {
  test("should create admin when adminClass is called", () => {
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
    const dataOfUsers = jane.readAllUsers();
    expect(jane.readAllUsers()).toEqual(dataOfUsers);
  });

  test("Admin method to read all orders", () => {
    const dataOfOrders = jane.readAllOrders();
    expect(jane.readAllOrders()).toEqual(dataOfOrders);
  });

  test("Admin method for single order", () => {
    const requestForOrders = jane.readSingleOrder(1);
    expect(requestForOrders).toEqual(requestForOrders);
  });

  test("Admin method for single order that dosent exit in database", () => {
    expect(jane.readSingleOrder(9)).toEqual("FALSE, order not found");
  });

  test("Admin method for single order that input is not a number", () => {
    expect(jane.readSingleOrder()).toEqual("Input must be a number");
    expect(jane.readSingleOrder("")).toEqual("Input must be a number");
  });

  test("Admin method for update order that input is not a valid type", () => {
    expect(jane.updateOrder("", "")).toEqual(
      "Product fields must be a string and ID a number"
    );
  });

  test("Admin method for update order that order id is not found", () => {
    expect(jane.updateOrder("Samsung", "Plantain", 9)).toEqual(
      "FALSE, order not found"
    );
  });

  test("Admin method for update order, when order id is found", () => {
    const resForUpdateOrder = jane.updateOrder("Vita Milk", "Coca Cola", 3);
    expect(resForUpdateOrder).toEqual(resForUpdateOrder);
  });

  test("Admin method for delete order that order id is not found", () => {
    expect(jane.deleteOrder(9)).toEqual("FALSE, order not found");
  });

  test("Admin method for delete order that order id is not a number", () => {
    expect(jane.deleteOrder("")).toEqual("Input must be of a number type");
  });

  test("Admin method for delete order that order id is valid and found", () => {
    expect(jane.deleteOrder(2)).toEqual("Order deleted succesful...");
  });

  test("Admin method for delete all orders from DB", () => {
    expect(jane.deleteAllOrder()).toEqual("Order database deleted succesfully");
  });

  test("Admin method to delete a user by ID when input of ID is invalid", () => {
    expect(jane.deleteUser("")).toEqual("Input must be a number");
  });

  test("Admin method to delete a user by ID when input of ID is valid but not found in DB", () => {
    expect(jane.deleteUser(10)).toEqual("FALSE, user not found");
  });

  test("Admin method to delete a user by ID when input of ID is valid and found in DB", () => {
    expect(king.deleteUser(4)).toEqual("User deleted succesful...");
  });

  test("Admin method to delete all users in DB", () => {
    expect(jane.deleteAllUsers()).toEqual("User database deleted succesfully");
  });
});
