const userService = require("./user.service");
const { User } = require("../models/user.model");


const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  const isMatching = await user.isPasswordMatch(password);

  if (!isMatching) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};