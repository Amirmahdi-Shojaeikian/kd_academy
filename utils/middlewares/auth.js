const jwt = require("jsonwebtoken");
const userModel = require("../../modules/user/user.model");

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization").split(" ");

  if (authHeader?.length !== 2) {
    return res.status(403).json({
      message: "This route is protected and you can't have access to it !!",
    });
  }

  const token = authHeader[1];

  try {
    const jwtToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne(jwtToken.id).lean();

    Reflect.deleteProperty(user, "password");

    req.user = user;

    next();
  } catch (error) {
    return res.json(error);
  }
};

const authToken = async (req, res, next) => {
  const authHeader = req.header("Authorization")
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const accessTokenPayload = jwt.verify(token, process.env.JWT_SECRET)
      req.email = accessTokenPayload.email;
      next();
    } catch (error) {
      return res.json({message : "توکن منقضی شده است"});
    }
  }else{
    return res.json({message : "دسترسی یه این api ندارید"})
  }

    
}

module.exports ={
  auth,
  authToken
}
