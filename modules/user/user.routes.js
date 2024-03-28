const express = require('express');
const controller = require("./user.controller");
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const { registerValidator  , loginValidator} = require('../../utils/validation/auth.validator');
const validate = require('../../utils/middlewares/validate');


const router = express.Router();



router.route("/")
    .get(authToken,isAdminMiddleware,controller.getAll)
    .post(authToken,isAdminMiddleware,registerValidator(),validate,controller.create)
router.route("/:id")
    .get(authToken,isAdminMiddleware,controller.getOne)
    .put(authToken,isAdminMiddleware,controller.update)
    .delete(authToken,isAdminMiddleware,controller.remove)




module.exports = router
