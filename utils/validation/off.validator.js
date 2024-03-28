const { body } = require("express-validator");

const offValidator = () => {
  return [
    body("code")
      .isString()
      .withMessage("لطفا کد را به شکل متن وارد کنید")
      .isLength({ min: 2, max: 15 })
      .withMessage("نام شما باید بین 3 تا 15 کاراکتر باشه"),

    body("percent")
      .isNumeric()
      .withMessage("لطفا درصد را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 15 })
      .withMessage("نام خانوادگی باید بین 3 تا 15 کاراکتر باشه"),

    body("product")
      .isString()
      .withMessage("لطفا نام محصول را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 24 })
      .withMessage("نام کاربری باید بین 3 تا 24 کاراکتر باشه"),

    body("max").isNumeric().withMessage("تعداد وارد شده معتبر نمی‌باشد"),

    body("uses")
      .isNumeric()
      .withMessage("تعداد استفاده شده معتبر نمی‌باشد")
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g)
      .withMessage("تعداد استفاده وارد شده با پترن مطابق نمی‌باشد"),

    body("creator")
      .isLength({ min: 8, max: 24 })
      .withMessage("ایجاد کننده باید بین 8 تا 24 کاراکتر باشه"),

  ];
};



module.exports = { offValidator };
