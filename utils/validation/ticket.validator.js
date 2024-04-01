const { body } = require("express-validator");

const ticketValidator = () => {
  return [
    body("title")
      .isString()
      .withMessage("لطفا نام را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 15 })
      .withMessage("تیتر شما باید بین 3 تا 15 کاراکتر باشه"),

    body("body")
      .isString()
      .withMessage("لطفا توضیحات را به شکل متن وارد کنید")
      .isLength({ min: 5, max: 255 })
      .withMessage("توضیحات باید بین 5 تا 255 کاراکتر باشه"),

  ];
};



module.exports = { ticketValidator };
