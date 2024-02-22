const express = require("express");
const path = require("path");
const app = express();


/*const ruta_public = path.resolve(__dirname, "./public");
app.use(express.static(ruta_public));*/
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.set('view engine',  'ejs');

app.set('views', path.join(__dirname, '/views'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`)
})

const rutaShoppingCart = require("./routes/shopping-cartRoute.js");
app.use("/shopping-cart", rutaShoppingCart);

const rutaUser = require("./routes/userRoute.js");
app.use("/user", rutaUser);

const rutaHome = require("./routes/homeRoute.js");
app.use("/", rutaHome);

const rutaProducts = require("./routes/product-detailRoute.js");
app.use("/product-detail", rutaProducts );

// /Create-product


