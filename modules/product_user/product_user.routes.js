const express = require('express');
const productUserController = require("./product_user.controller")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")

const router = express.Router();


router.route("/").get(authToken,productUserController.getAll)

router.route("/:id").get(authToken,productUserController.getOne)


module.exports = router