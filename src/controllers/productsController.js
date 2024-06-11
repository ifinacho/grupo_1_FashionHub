const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const controller = {
    // home - muestra todos los productos
    index: (req, res) => {
		res.render('home', {products});
	},
    
    //details - muestra los detalles de todos los productos
    details : (req, res) => {
        console.log(req.params.id)
        const idFound = req.params.id
        const product = products.find(product => product.id == idFound)
        console.log(product)
        res.render("product-detail", {product});
    },

    edit: (req,res)=>{
        const idFound = req.params.id
        const product = products.find(product => product.id == idFound)
        res.render('edit-product', {product});
    },
    editPut: (req, res)=>{
        console.log(req.params.id)
        const idFound = req.params.id
		products.forEach(product => {
			if(product.id == idFound){
				product.name = req.body.name;
				product.price = Number(req.body.price);
				product.discount = Number(req.body.discount);
                product.color = req.body.color;
                product.size = req.body.size;
				product.description = req.body.description;
				product.image = req.file.filename;
                product.category = req.body.category;
			}            
        })        
        fs.writeFileSync(productsFilePath,JSON.stringify(products, null, 4))

        res.redirect('/Coleccion')
    },
    delete: (req, res)=>{
        const idDelete = req.params.id
		const productsDeleted = products.filter((product)=> product.id != idDelete)

        fs.writeFileSync(productsFilePath,JSON.stringify(productsDeleted, null, 4))

		res.redirect('/Coleccion')
    }
};
module.exports = controller;