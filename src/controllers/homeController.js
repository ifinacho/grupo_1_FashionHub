const fs = require('fs');
const path = require('path');
const db = require("../database/models/")
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const TheProducts = products.filter((product) => product.category === "Atuendo" || product.category === "Pantalon" || product.category === "Remera" || product.category === "Vestido" || product.category === "Calzado" || product.category === "Accesorio")
		res.render("home", { TheProducts });
	},
	categories: (req, res) => {
		const category = req.params.category // clothes || accessories || footwear
		db.Product.findAll({
			where: {
				category: { [db.Sequelize.Op.eq]: category } 
			}
		})
			.then(products => {
				res.render("categories", { products })
			})
			.catch(error => {
				console.error(error);
			});
		/*const TheProducts = products.filter((product)=> product.category === "Atuendo" || product.category === "Pantalon" || product.category === "Remera" || product.category === "Vestido" || product.category === "Calzado" || product.category === "Accesorio")
		res.render('Coleccion',{TheProducts})*/
	},
	search: (req, res) => {
		const busqueda = req.query.keywords
		db.Product.findAll({
			where: {
				[db.Sequelize.Op.or]: [{ name: { [db.Sequelize.Op.like]: `%${busqueda}%` } },
				{ category: { [db.Sequelize.Op.like]: `%${busqueda}%` } },
				{ description: { [db.Sequelize.Op.like]: `%${busqueda}%` } }]
			}
		})
			.then(products => {
				res.render("results", { products, busqueda })
			})
			.catch(error => {
				console.error(error);
			});
		/*const productoBuscado = products.filter((product)=> product.name.toLowerCase().includes(busqueda))
		
		res.render('results',{
			productoBuscado,
			busqueda,
			productso
		})*/
	},
};
module.exports = controller;