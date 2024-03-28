const userModel = require("./../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateAccessToken,generateRefreshToken} = require("../../utils/middlewares/auth.token");
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      role,
    } = req.body;
    const user = await userModel.create({
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      role,
    });

    return res.json(user);
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (user) {
      if (isValidPassword) {
        const accessToken = generateAccessToken(user.email);
        const refreshToken = generateRefreshToken(user.email);
        const updateUser = await userModel.findOneAndUpdate(
          { email },
          {
            $set: { refreshToken },
          }
        );
        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        return res.json({ message: "login successfully " });
      }
      return res.json({ message: "user not found" });
    }
    return res.json({ message: "passwords do not match" });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh_token"]
    if (!refreshToken) {
        return res.status(401).json({message : "no have refresh token"})
    }

    const user = await userModel.findOne({refreshToken})
    if (!user) {
        return res.status(403).json({message : "not user found"})
    }
    jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET)
    const newRefreshToken = generateAccessToken(user.email)
    res.cookie("access_token", newRefreshToken, { httpOnly: true });
    return res.json({message : "okk"})

  } catch (error) {
    throw new Error(error)
  }
};
