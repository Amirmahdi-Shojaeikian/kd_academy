const productModel = require("./../products/product.model")
const articleModel = require("./../articles/articles.model")

exports.get = async(req,res) => {
    const {keyword} = req.params
    const searchProduct = await productModel.find({
        title: {$regex: ".*" + keyword + ".*"}
    })
    const searchArticle = await articleModel.find({
        title: {$regex: ".*" + keyword + ".*"}
    })
    return res.json({result:{searchProduct , searchArticle}})
}