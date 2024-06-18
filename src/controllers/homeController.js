const db = require("../database/models/")

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: async(req, res) => {
		const products = await db.Product.findAll();
		res.render("home", { products });
	},
	categories: async (req, res) => {
		const categoryId = req.params.category;
		try {
			const products = await db.Product.findAll({
				where: { categoryId },
				include: [{
					model: db.Category
				}]
			});
			res.render("categories", { products });
		} catch (error) {
			console.log(error);
			res.status(500).send("error al obtener productos")
		}
		/*db.Product.findAll({
			where: {
				categoryId: { [db.Sequelize.Op.eq]: categoryId },
				include: [{model: db.Category, as: "category"}]
			}
		})
			.then(products => {
				res.render("categories", { products })
			})
			.catch(error => {
				console.error(error);
			});*/
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