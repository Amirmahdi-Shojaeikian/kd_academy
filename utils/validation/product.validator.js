const { body } = require("express-validator");

const productValidator = () => {
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

    body("price")
      .isNumeric()
      .withMessage("لطفا نام متن اصلی را به شکل عدد وارد کنید")
      .isLength({ min: 4, max: 100 })
      .withMessage("متن اصلی باید بین 4 تا 100 کاراکتر باشه"),

    body("href")
      .isString()
      .withMessage("مخفف نامعتبر است")
      .isLength({ min: 3, max: 15 })
      .withMessage("مخفف باید بین 3 تا 15 کاراکتر باشه"),
    
      body("stock")
      .isNumeric()
      .withMessage("موجودی نادرست است"),
      
    body("status")
      .isString()
      .withMessage("وضعیت باید به صورت کاراکتر باشد")
      .isLength({ min: 2, max: 15 })
      .withMessage("مخفف باید بین 3 تا 15 کاراکتر باشه"),
    body("categoryId")
      .isString()
      .withMessage("دسته بندی باید کاراکتر باشد"),
    body("discount")
      .isNumeric()
      .withMessage("تخفیف باید عدد باشد")
      .optional(),
    body("Bought")
      .isNumeric()
      .withMessage("تعداد باید عدد باشد")
      .optional(),
        
    
      

  ];
};



module.exports = { productValidator };
