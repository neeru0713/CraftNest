const {  userService } = require("../services");

const getUserByName = async (req, res, next) => {
let user = await userService.getUserByName(req.params.username)
res.status(200).json({user: user});
}


module.exports = {
 getUserByName,
 
};
