const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    price:{
        type : Number,
        required: true
    },
    stock:{
        type : Number ,
        required: false
    },
    cover:{
        type : String ,
        required: true
    },
    href:{
        type : String ,
        required: true
    },
    status:{
        type : String ,
        required: true
    },
    categoryId :{
        type: mongoose.Types.ObjectId,
        ref: "CategoryProduct",
        required: true
    },
    creator : {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    discount :{
        type : Number,
        required: false
    },
    Bought: {
        type : Number,
        required: false
    }


},{timestamps: true})



const model = mongoose.model("Product",schema)

module.exports = model