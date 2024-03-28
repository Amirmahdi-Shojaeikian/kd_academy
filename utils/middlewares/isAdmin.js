const userModel = require("./../../modules/user/user.model")
module.exports = async (req, res, next) => {
  // const isAdmin = req.user.role === "ADMIN";
  const isAdmin = await userModel.findOne({email : req.email})
  if (isAdmin.role === "ADMIN") {
    req.isAdmin = isAdmin
    return next();
  }else{
    return res.status(403).json({
      message : "this route for admin is already"
    })
  }


};
