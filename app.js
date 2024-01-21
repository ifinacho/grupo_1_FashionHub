const express = require("express");
const path = require("path");
const app = express();

const ruta_public = path.resolve(__dirname, "./public");
app.use(express.static(ruta_public));

app.listen(3000, () => {
    console.log("server corriendo");
});

app.get("/shopping-cart", (req, res) => {
    const path_shopping_cart = path.resolve(__dirname, "views/shopping-cart.html");
    res.sendFile(path_shopping_cart);
});
app.get("/login", (req, res) => {
    const path_login = path.resolve(__dirname, "views/login.html");
    res.sendFile(path_login);
});
app.get("/home", (req, res) => {
    const path_home = path.resolve(__dirname, "views/home.html");
    res.sendFile(path_home);
});
app.get("/register", (req, res) => {
    const path_register = path.resolve(__dirname, "views/registro.html");
    res.sendFile(path_register);
})

