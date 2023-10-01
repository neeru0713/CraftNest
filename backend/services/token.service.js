const jwt = require("jsonwebtoken");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = "mysecret") => {
  const payload = {
    exp: expires,
    sub: userId,
    type: type,
  };
  const token = jwt.sign(payload, secret);
  console.log(token);
  return token;
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
// Calculate the expiration date by adding the specified number of days to the current date
const generateAuthTokens = async (user) => {
  console.log("inside generateAuthTokens service");
  const expires =
    Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  let token = generateToken(user._id, expires, "access");
  // let expiration = new Date();
  // expiration.setDate(expiration.getDate() + 1);
  // expiration = expiration;

  let obj = {
    access: {
      token: token,
      expires: new Date(expires * 1000),
    },
  };

  return obj;
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
