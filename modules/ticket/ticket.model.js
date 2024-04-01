const mongoose = require("mongoose")

const schema = mongoose.Schema({
    departmentID : {
        type: mongoose.Types.ObjectId,
        ref : "Department",
        required: true,
    },
    subDepartmentID : {
        type: mongoose.Types.ObjectId,
        ref : "SubDepartment",
        required: true,
    },
    priority:{
        type: Number,
        required: true,
    },
    title :{
        type: String,
        required: true,
    },
    body:{
        type:String,
        required : true
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    answer : {
        type: Number,
        required: true,
    },
    product:{
        type: mongoose.Types.ObjectId,
        required : false,
        ref : "Product",
    },
    parent:{
        type: mongoose.Types.ObjectId,
        ref : "Ticket",
        required : false
    },
    isAnswer : {
        type: Number,
        required : true
    }

},
{ timestamps: true })

const model = mongoose.model("Ticket",new mongoose.Schema(schema))

module.exports = model

