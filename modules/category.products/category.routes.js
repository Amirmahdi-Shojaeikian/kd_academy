const express = require("express")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const categoryController = require("./category.controller")
const { categoryValidator } = require('../../utils/validation/category.validator');
const validate = require('../../utils/middlewares/validate');

const router = express.Router()

router.route("/")
    .get(authToken,isAdminMiddleware,categoryController.getAll)
    .post(authToken,isAdminMiddleware,categoryValidator(),validate,categoryController.create)

router.route("/:id")
    .delete(authToken,isAdminMiddleware,categoryController.remove)
    .put(authToken,isAdminMiddleware,categoryValidator(),validate,categoryController.update)


module.exports = router