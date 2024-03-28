const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccessToken =  (email) => {
    const accessToken =  jwt.sign({email},process.env.JWT_SECRET,{
        expiresIn : "1d"
    })
    return accessToken
}

const generateRefreshToken =  (email) => {
    const refreshToken =  jwt.sign({email},process.env.JWT_REFRESH_SECRET,{
        expiresIn : "30d"
    })
    return refreshToken
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}