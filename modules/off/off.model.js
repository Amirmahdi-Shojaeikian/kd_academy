const mongoose = require("mongoose")

const schema = mongoose.Schema({
    code : {
        type: String,
        required: true,
    },
    percent : {
        type: Number,
        required: true,
    },
    product : {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required : true,
    },
    max : {
        type: Number,
        required: true,
    },
    uses : {
        type: Number,
        required: true,
    },
    creator : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{ timestamps: true })




const model = mongoose.model("Off",new mongoose.Schema(schema))

module.exports = model

