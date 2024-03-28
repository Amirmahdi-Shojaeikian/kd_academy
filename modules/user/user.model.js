const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const schema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName:{
        type: String, 
        required : true
    },
    username:{
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    email: {
        type :String,
        required : true
    },
    phoneNumber :{
        type:String,
        required : true
    },
    role:{
        type:String,
        enum :["ADMIN","USER"],
        default : "USER"
    },
    refreshToken: {
        type:String,
    }
},{ timestamps: true })

// schema.pre("save" , function (){
//     console.log("Saving schema",this.firstName, this.lastName);
// })

schema.pre("save" ,  function (){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
    // const isValid = bcrypt.compareSync('13822003',this.password)
    // console.log(isValid);
})

const model = mongoose.model("User",new mongoose.Schema(schema))


module.exports = model
// 53
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const result  = bcrypt.genSaltSync(10)
// const passwordHash = bcrypt.hashSync("Aa12345678$",result)

// console.log(passwordHash);


// //54
// const isValidPassword= bcrypt.compareSync("Aa12345678$",passwordHash)
// console.log(isValidPassword);


// 56
// const secretkey = "wosergfiuoskljdfhfggow"
// const accessToken = jwt.sign({id : 112, email: "amir@gmail.com"},secretkey,{
//     expiresIn : "10 day"
// })

// console.log(accessToken);

// //57
// const verify = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEyLCJlbWFpbCI6ImFtaXJAZ21haWwuY29tIiwiaWF0IjoxNzA3NTMwMTY0LCJleHAiOjE3MDgzOTQxNjR9.O7xd5V2x2Y_z63hMRB0v_UCHndKY3BoEY1xp5PzRsJM",
// secretkey
// )
// console.log(verify);



// 58
// const decodedToken = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEyLCJlbWFpbCI6ImFtaXJAZ21haWwuY29tIiwiaWF0IjoxNzA3NTMwMTY0LCJleHAiOjE3MDgzOTQxNjR9.O7xd5V2x2Y_z63hMRB0v_UCHndKY3BoEY1xp5PzRsJM")
// console.log(decodedToken);
// console.log(decodedToken);


// 59
// const secretkey = "wosergfiuoskljdfhfggow"
// const accessToken = jwt.sign({id : 112, email: "amir@gmail.com"},secretkey,{
//     expiresIn : "2s"
// })

// setTimeout(() => {
//     try {
//         const verify = jwt.verify(accessToken,secretkey)
//         console.log(verify);
//     } catch (error) {
//         console.log(error.message);
//     }
//     ``
// }, 2500);