const express = require("express")
const {authToken, auth} = require('../../utils/middlewares/auth');
const isAdminMiddleware = require("../../utils/middlewares/isAdmin")
const offController = require("./off.controller")
const { offValidator } = require('../../utils/validation/auth.validator');
const validate = require('../../utils/middlewares/validate');

const router = express.Router()

router.route("/")
    .get(authToken,isAdminMiddleware,offController.getAll)
    .post(authToken,isAdminMiddleware,offValidator(),validate,offController.create)

router.route("/:id")
    .delete(authToken,isAdminMiddleware,offController.remove)
    .put(authToken,isAdminMiddleware,offValidator(),validate,offController.update)


module.exports = router