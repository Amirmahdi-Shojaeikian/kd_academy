const productUserModel = require("./product_user.model")
const userModel = require("./../user/user.model");
const { default: mongoose } = require("mongoose");

exports.getAll = async(req,res) => {
    const user = await userModel.findOne({email : req.email})
    const productUser = await productUserModel.find({user : user._id,status:"buy"}).lean();
    return res.json(productUser)
}

exports.getOne = async(req,res) => {
    const {id} = req.params
    if(mongoose.Types.ObjectId.isValid(id)){
        const product = await productUserModel.findOne({_id : id})
            .populate("product")
            .lean();
    if (!product) {
        return res.json({
            message : "Product not found"
        })
    }
    return res.json(product)
    }
    return res.json({
        message : "Product not found"
    })
}