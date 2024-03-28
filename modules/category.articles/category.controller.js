const { default: mongoose } = require("mongoose")
const categoryModel = require("./category.model")


exports.create = async (req,res) => {
try {
    const {title , href} = req.body
    const userId = req.isAdmin._id
    const category = await categoryModel.create({title, href,creator : userId})
    return res.json(category)
} catch (error) {
    return res.json({error: error})
}
}
exports.getAll = async (req,res) => {
    const category = await categoryModel.find({}).populate("creator","username").lean()
    return res.json(category)
}
exports.remove = async (req,res) => {
    const  { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        const category = await categoryModel.findOneAndDelete({_id : id})
        if (category) {
            return res.json(category)
        }
        return res.json({
            message : "category not found"
        })
    }
    return res.json({
        message : "id not valid"
    })
}
exports.update = async (req,res) => {
    const {id} = req.params
    const {title , href} = req.body
    if (mongoose.Types.ObjectId.isValid(id)) {
        const category = await categoryModel.findOne({_id : id})
        if (category) {
            const updateCategory = await categoryModel.findOneAndUpdate({title , href})
            return res.json(updateCategory)
        }
        return res.json({
            message : "category not found"
        })
    }
    return res.json({
        message : "id not valid"
    })
}
