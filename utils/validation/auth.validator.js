const { body } = require("express-validator");

const registerValidator = () => {
  return [
    body("firstName")
      .isString()
      .withMessage("لطفا نام را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 15 })
      .withMessage("نام شما باید بین 3 تا 15 کاراکتر باشه"),

    body("lastName")
      .isString()
      .withMessage("لطفا نام خانوادگی را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 15 })
      .withMessage("نام خانوادگی باید بین 3 تا 15 کاراکتر باشه"),

    body("username")
      .isString()
      .withMessage("لطفا نام کاربری را به شکل متن وارد کنید")
      .isLength({ min: 3, max: 24 })
      .withMessage("نام کاربری باید بین 3 تا 24 کاراکتر باشه"),

    body("email").isEmail().withMessage("ایمیل وارد شده معتبر نمی‌باشد"),

    body("phoneNumber")
      .isString()
      .withMessage("شماره تماس وارد شده معتبر نمی‌باشد")
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g)
      .withMessage("شماره تماس وارد شده با پترن مطابق نمی‌باشد"),

    body("password")
      .isLength({ min: 8, max: 24 })
      .withMessage("پسورد باید بین 8 تا 24 کاراکتر باشه"),

    body("confirmPassword").custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      } else {
        throw new Error("پسورد های وارد شده همخونی ندارن");
      }
    }),
    body("role")
    .isLength({ min: 3, max: 24 })
    .withMessage("پسورد باید بین 8 تا 24 کاراکتر باشه")
    .optional(),


  ];
};

const loginValidator = () => {
    return[
        body("email")
            .isEmail()
            .withMessage("ایمیل وارد شده معتبر نمی‌باشد"),
        body("password")
          .isLength({ min: 8, max: 24 })
          .withMessage("پسورد باید بین 8 تا 24 کاراکتر باشه"),
    ]
}


module.exports = { registerValidator ,loginValidator };
