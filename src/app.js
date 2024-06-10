const express = require("express");
const session = require("express-session")
const cookies = require("cookie-parser")
const path = require("path");
const methodOverride = require('method-override');
const userMiddleware = require("./middlewares/userMiddleware.js")
const app = express();
const rutaShoppingCart = require("./routes/shopping-cartRoute.js");
const rutaUser = require("./routes/userRoute.js");
const rutaHome = require("./routes/homeRoute.js");
const rutaProducts = require("./routes/product-detailRoute.js");
const rutaCreate = require("./routes/CreateRoute.js");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userMiddleware);

app.set('view engine',  'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use("/create", rutaCreate)
app.use("/", rutaHome);
app.use("/product-detail", rutaProducts);
app.use("/shopping-cart", rutaShoppingCart);
app.use("/user", rutaUser);

app.use((req, res, next) => {
    res.status(404).render("404error");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});
