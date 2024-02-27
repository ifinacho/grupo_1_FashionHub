const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const app = express();

/*const ruta_public = path.resolve(__dirname, "./public");
app.use(express.static(ruta_public));*/

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine',  'ejs');
app.set('views', path.join(__dirname, '/views'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

const rutaCreate = require("./routes/CreateRoute.js")
app.use("/create", rutaCreate)

const rutaHome = require("./routes/homeRoute.js");
app.use("/", rutaHome);

const rutaProducts = require("./routes/product-detailRoute.js");
app.use("/product-detail", rutaProducts );

const rutaShoppingCart = require("./routes/shopping-cartRoute.js");
app.use("/shopping-cart", rutaShoppingCart);

const rutaUser = require("./routes/userRoute.js");
app.use("/user", rutaUser);
