const { default: mongoose } = require("mongoose");
const productModel = require("./product.model");
const userModel = require("./../user/user.model");
const userProductModel = require("./../product_user/product_user.model");

exports.create = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      cover,
      href,
      status,
      categoryId,
      discount,
    } = req.body;
    const userId = req.isAdmin._id;
    const product = await productModel.create({
      title,
      description,
      price,
      stock,
      cover: req.file.filename,
      href,
      status,
      categoryId,
      creator: userId,
      discount,
      Bought: 0,
    });
    return res.json(product);
  } catch (error) {
    return res.json({ error: error });
  }
};
exports.getAll = async (req, res) => {
  const product = await productModel
    .find({})
    .populate("creator", "username")
    .populate("categoryId", "title")
    .lean();
  return res.json(product);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await productModel.findOneAndDelete({ _id: id });
    if (product) {
      return res.json(product);
    }
    return res.json({
      message: "product not found",
    });
  }
  return res.json({
    message: "id not valid",
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    stock,
    cover,
    href,
    status,
    categoryId,
    discount,
  } = req.body;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await productModel.findOne({ _id: id });
    if (product) {
      const updateProduct = await productModel.findOneAndUpdate({
        title,
        description,
        price,
        stock,
        cover,
        href,
        status,
        categoryId,
        discount,
      });
      console.log(updateProduct);
      return res.json(updateProduct);
    }
    return res.json({
      message: "product not found",
    });
  }
  return res.json({
    message: "id not valid",
  });
};
exports.buy = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const user = await userModel.findOne({ email: req.email });
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.json({ message: "product not found" });
    }
    const userProduct = await userProductModel.create({
      product: id,
      user: user._id,
      price: product.price,
      status: "buy",
    });
    let productStock = product.stock - 1;
    let productBought = product.Bought + 1;
    const productBuy = await productModel.findOneAndUpdate(
      { _id: id },
      {
        stock: productStock,
        Bought: productBought,
      }
    );
    return res.json(userProduct);
  }
  return res.json({
    message : "id not valid"
  })
};
