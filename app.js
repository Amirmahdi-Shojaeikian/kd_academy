const express = require('express');
const authRoutes =require("./modules/auth/auth.routes");
const usersRoutes =require("./modules/user/user.routes");
const categoryArticlesRoutes =require("./modules/category.articles/category.routes");
const categoryProductsRoutes =require("./modules/category.products/category.routes");
const productsRoutes =require("./modules/products/product.routes");
const articlesRoutes =require("./modules/articles/articles.routes");
const cookieParser = require("cookie-parser")
require("./config/db");
require("dotenv").config();

const app = express();

app.use(cookieParser("kdAmsh"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/auth",authRoutes)
app.use("/users",usersRoutes)
app.use("/categoryArticles",categoryArticlesRoutes)
app.use("/categoryProducts",categoryProductsRoutes)
app.use("/articles",articlesRoutes)
app.use("/products",productsRoutes)




app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
  })

app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT} `);
})