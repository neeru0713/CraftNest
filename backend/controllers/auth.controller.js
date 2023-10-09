const { authService, userService, tokenService } = require("../services");

const register = async (req, res) => {
  try {
    console.log("inside register controller");
    let newUser = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(newUser);
    let resObj = {
      user: newUser,
      tokens: tokens,
      message: "Congratulations and welcome to craftnest",
    };
    console.log(resObj);
    res.status(201).json(resObj);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    let user = await authService.loginUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    let resObj = {
      user: user,
      tokens: tokens,
      message: "Welcome back " + user.email,
    };
    console.log(resObj);
    res.status(200).json(resObj);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
