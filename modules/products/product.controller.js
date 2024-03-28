const { default: mongoose } = require("mongoose")
const productModel = require("./product.model")


exports.create = async (req,res) => {
try {
    const {title,description,price,stock,cover,href,status,categoryId,discount} = req.body
    const userId = req.isAdmin._id
    const product = await productModel.create({title,description,price,stock,cover:req.file.filename,href,status,categoryId,creator:userId,discount})
    return res.json(product)
} catch (error) {
    return res.json({error: error})
}
}
exports.getAll = async (req,res) => {
    const product = await productModel.find({})
        .populate("creator","username")
        .populate("categoryId","title")
        .lean()
    return res.json(product)
}
exports.remove = async (req,res) => {
    const  { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        const product = await productModel.findOneAndDelete({_id : id})
        if (product) {
            return res.json(product)
        }
        return res.json({
            message : "product not found"
        })
    }
    return res.json({
        message : "id not valid"
    })
}
exports.update = async (req,res) => {
    const {id} = req.params
    const {title,description,price,stock,cover,href,status,categoryId,discount} = req.body
    if (mongoose.Types.ObjectId.isValid(id)) {
        const product = await productModel.findOne({_id : id})
        if (product) {
            const updateProduct = await productModel.findOneAndUpdate({title,description,price,stock,cover,href,status,categoryId,discount})
            console.log(updateProduct);
            return res.json(updateProduct)
        }
        return res.json({
            message : "product not found"
        })
    }
    return res.json({
        message : "id not valid"
    })
}
