const express = require('express');
const productsController = require("./product.controller")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const { productValidator } = require('../../utils/validation/product.validator');
const validate = require('../../utils/middlewares/validate');
const multer = require('./../../utils/middlewares/multer');


const router = express.Router();

router.route("/buy/:id")
.post(authToken,productsController.buy)

router.route("/")
    .get(authToken,isAdminMiddleware,productsController.getAll)
    .post(authToken,isAdminMiddleware,multer.single("cover"),productValidator(),validate
          ,productsController.create)

router.route("/:id")
    .delete(authToken,isAdminMiddleware,productsController.remove)
    .put(authToken,isAdminMiddleware,productsController.update)

module.exports = router