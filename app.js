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
})
