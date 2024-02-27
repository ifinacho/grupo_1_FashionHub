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
        const idFound = +req.params.id
        const product = products.find(product => product.id === idFound)
        res.render("product-detail", {product});
    },

    edit: (req,res)=>{
        const idFound = +req.params.id
        const product = products.find(product => product.id === idFound)
        res.render('edit-product',{product});
    },
    editPut: (req, res)=>{
        const idFound = +req.params.id
        const {name, description, price, discount, color, talle, image}= req.body
		products.forEach(product => {
			if(product.id == idFound){
				product.name = name
				product.price = price
				product.discount = discount
				product.description = description
				product.color = color
                product.talle = talle
				product.image = image
			}
			
		})
        fs.writeFileSync(
            productsFilePath,JSON.stringify(products,null, 2),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/home')
    },
    delete: (req, res)=>{
        const idDelete = +req.params.id
		const something = products.filter((user)=> user.id != idDelete)
        /*res.render('delete the product')*/

        fs.writeFileSync(
			productsFilePath,JSON.stringify(something,null,4),
			{
				encoding: "utf-8"
			}
		
		)
		res.redirect('/')
    }
};
module.exports = controller;