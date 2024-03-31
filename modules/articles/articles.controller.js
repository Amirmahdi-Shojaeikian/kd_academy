const { default: mongoose, mongo } = require("mongoose");
const articlesModel = require("./articles.model")


exports.getAll = async (req, res) => {
  const articles = await articlesModel
    .find({})
    .populate("creator","firstName lastName")
    .populate("category","title href")
    .lean();
  return res.json(articles);
};
exports.create = async (req, res) => {
    // console.log(req.file.cover);
    const {title,description,body,cover,href,category,published} = req.body;
    const article = await articlesModel.create
    ({title,description,body,creator:req.isAdmin._id,href,category,published,image:req.files})

  return res.json(article)
};
exports.remove = async (req, res) => {
    try {
        const {id} = req.params;
        if (mongoose.Types.ObjectId.isValid(id)){
            const article = await articlesModel.findOneAndDelete({_id : id})
            if (article){
                return res.json(article)
            }
            return res.json({
                message : "article not found"
            })
        }
        return res.json({
            message: "id not valid"
        })
    } catch (error) {
        throw new Error(error.message)
    }
};
exports.update = async (req, res) => {
    const {id} = req.params
    const {title,description,body,cover,href,category,published} = req.body;
    if (mongoose.Types.ObjectId.isValid(id)) {
        const article = await articlesModel.findOneAndUpdate({_id : id},
            {title,description,body,href,category,published,imageBody})
        if (article) {
            return res.json(article)
        }
        return res.json({
            message : "article not found"
        })
    }
    return res.json({
        message : "id not valid"
    })
};
