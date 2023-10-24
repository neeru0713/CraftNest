const { User } = require("../models/user.model.js");
// const bcrypt = require("bcryptjs");


/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
async function createUser(userBody) {
  
  let userExists = await User.isEmailTaken(userBody.email);
  if (userExists) {
    // let error = new ApiError(httpStatus.OK, "Email already taken");
    // throw error;
  } else {
    const result = await User.create(userBody);
    return result;
  }
}

 async function getUserByEmail(email) {
   return await User.findOne({ email: email });
 }

module.exports = {
  createUser,
  getUserByEmail,
};
