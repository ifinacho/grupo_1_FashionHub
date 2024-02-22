const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index : (req, res) => {
        const TheProducts = products.filter((product)=> product.category === "Atuendo" || product.category === "Pantalon" || product.category === "Remera" || product.category === "Vestido" || product.category === "Calzado" || product.category === "Accesorio")
        res.render("home",{TheProducts});
    },
	search: (req, res) => {
		const busqueda = req.query.keywords
		const productoBuscado = products.filter((product)=> product.name.includes(busqueda.toLowerCase()))
		busqueda.
		res.render('results',{productoBuscado, busqueda})
	},
};
module.exports = controller;