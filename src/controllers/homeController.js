const db = require("../database/models/")

const controller = {
	index: async(req, res) => {
		const products = await db.Product.findAll();
		res.render("home", { products });
	},
	categories: async (req, res) => {
		const categoryParams = req.params.category;
		try {
			const category = await db.Category.findOne({
				where: {
					name : categoryParams
				}
			})
			const products = await db.Product.findAll({
				where: { 
					categoryId: category.id },
			});
			res.render("categories", { products });
		} catch (error) {
			console.log(error);
			res.status(500).send("error al obtener productos")
		}
	},
	search: (req, res) => {
		const busqueda = req.query.keywords
		db.Product.findAll({
			where: {
				[db.Sequelize.Op.or]: [
					{ name: { [db.Sequelize.Op.like]: `%${busqueda}%` } },
					{ categoryId: { [db.Sequelize.Op.like]: `%${busqueda}%` } },
					{ description: { [db.Sequelize.Op.like]: `%${busqueda}%` } }]
			}
		})
			.then(products => {
				res.render("results", { products, busqueda })
			})
			.catch(error => {
				console.error(error);
			});
	}
};
module.exports = controller;