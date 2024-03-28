const express = require('express');
const controller = require("./../auth/auth.controller");
const { registerValidator  , loginValidator} = require('../../utils/validation/auth.validator');
const validate = require('../../utils/middlewares/validate');

const router = express.Router();


router.route("/register").post(registerValidator(),validate,controller.register)
router.route("/login").post(loginValidator(),validate,controller.login)
router.route("/refresh-token").post(controller.refreshToken)


module.exports = router
