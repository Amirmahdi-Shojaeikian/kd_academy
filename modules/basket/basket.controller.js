const basketModel = require("./basket.model");
const productsUserModel = require("./../product_user/product_user.model");
const productsModel = require("./../products/product.model");
const usersModel = require("./../user/user.model");
const { default: mongoose } = require("mongoose");

exports.getBasket = async (req, res) => {
  const user = await usersModel.findOne({ email: req.email });
  const basket = await basketModel.find({ user: user._id });
  return res.json(basket);
};

exports.add = async (req, res) => {
  const { id } = req.body;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await productsModel.findOne({ _id: id });
    const user = await usersModel.findOne({ email: req.email });
    if (product) {
      const basket = await basketModel.create({
        total: product.price,
        productsId: id,
        user: user._id,
      });
      return res.json(basket);
    }

    return res.json({
      message: "product not found",
    });
  }
  return res.json({
    message: "id not valid",
  });
};

exports.finished = async (req, res) => {
  const { id } = req.params;
  const user = await usersModel.findOne({ email: req.email });
  if (mongoose.Types.ObjectId.isValid(id)) {
    const basket = await basketModel.findOne({ _id: id });
    if (!basket) {
      return res.json({
        message: "id not valid",
      });
    }

    for (let i = 0; i < basket.productsId.length; i++) {
      let productId = basket.productsId[i];
      const product = await productsModel.findOne({ _id: productId });
      const userProduct = await productsUserModel.create({
        product: productId,
        user: user._id,
        price: product.price,
        status: "buy",
      });
      let productStock = product.stock - 1;
      let productBought = product.Bought + 1;
      const productBuy = await productsModel.findOneAndUpdate(
        { _id: id },
        {
          stock: productStock,
          Bought: productBought,
        }
      );
    }

    return res.json({ message: "ok" });
  }
  return res.json({
    message: "id not valid",
  });
};

exports.update = async (req, res) => {
  const { idBasket } = req.params;
  const { id } = req.body;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const product = await productsModel.findOne({ _id: id });
    if (product) {
      const basket = await basketModel.findOne({ _id: idBasket });
      const basketNew = await basketModel.findOneAndUpdate(
        { _id: idBasket },
        {
          $push: {
            productsId: id,
          },
          $set: {
            total: basket.total + product.price,
          },
        }
      );
      return res.json(basketNew);
    }

    return res.json({
      message: "product not found",
    });
  }
  return res.json({
    message: "id not valid",
  });
};


exports.removeOne = async (req,res) => {
    const { idProduct } = req.params
    const {idBasket} = req.body
    if (mongoose.Types.ObjectId.isValid(idProduct)) {
        if (mongoose.Types.ObjectId.isValid(idBasket)) {
            const basket = await basketModel.findOne({_id : idBasket})
            const NewProducts = basket.productsId.filter(product => product.toString() !== idProduct )
            console.log(NewProducts);
            const newBasket = await basketModel.findOneAndUpdate({_id : idBasket},{
                productsId: NewProducts
            })
            return res.json(newBasket)
        }
    }

}
