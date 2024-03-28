const { body } = require("express-validator");

const articleValidator = () => {
  return [
    body("title")
      .isString()
      .withMessage("لطفا نام را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 15 })
      .withMessage("تیتر شما باید بین 3 تا 15 کاراکتر باشه"),

    body("description")
      .isString()
      .withMessage("لطفا توضیحات را به شکل متن وارد کنید")
      .isLength({ min: 5, max: 255 })
      .withMessage("توضیحات باید بین 5 تا 255 کاراکتر باشه"),

    body("body")
      .isString()
      .withMessage("لطفا نام متن اصلی را به شکل متن وارد کنید")
      .isLength({ min: 10, max: 300 })
      .withMessage("متن اصلی باید بین 10 تا 300 کاراکتر باشه"),

    body("href")
      .isString()
      .withMessage("مخفف نامعتبر است")
      .isLength({ min: 3, max: 15 })
      .withMessage("مخفف باید بین 3 تا 15 کاراکتر باشه"),
    
      body("published")
      .isNumeric()
      .withMessage("وضعیت انتشار نامعتبر است")
      

  ];
};



module.exports = { articleValidator };
