const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   title:{
       type: String,
       required: true
   },
   description:{
       type: String,
       required: true
   },
   body:{
       type: String,
       required: true
   },
   cover:{
       type: String,
       required: true
   },
   creator:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
   },
   href:{
       type: String,
       required: true
   },
   category:{
       type: mongoose.Types.ObjectId,
       ref: "CategoryArticle",
       required: true
   },
   published:{
       type: Number,
       enum:[0,1,2],
       default:0,
       required: true
   },
   imageBody:{
    type: Array,
    required: true
   }
},{timestamps:true});


const model =  mongoose.model("Article", schema)

module.exports= model