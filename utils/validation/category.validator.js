const { body } = require("express-validator");

const categoryValidator = () => {
    return[
        body("title")
            .isString()
            .withMessage("تیتر نامعتبر است")
            .isLength({min: 3,max:15})
            .withMessage("تیتر باید بین 3 تا 15 کاراکتر باشه"),
        body("href")
          .isString()
          .withMessage("مخفف نامعتبر است")
          .isLength({ min: 3, max: 15 })
          .withMessage("مخفف باید بین 3 تا 15 کاراکتر باشه"),
    ]
}


module.exports = { categoryValidator };
