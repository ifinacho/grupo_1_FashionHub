const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const controller = {
    // home - muestra todos los productos
    home: (req, res) => {
		res.render('home', {products});
	},
    //details - muestra los detalles de todos los productos
    details : (req, res) => {
        const idFound = +req.params.id
        const ProductsId = products.find(pro => pro.id === idFound)
        res.render("product-detail", {ProductsId});
    },
    create: (req, res)=> {
        const idFound = +req.params.id
        const ProductsId = products.find(pro => pro.id === idFound)
        res.render('Create-product', {ProductsId})
    },
    createPost: (req,res)=>{
        let newProduct = {
			id: crypto.randomUUID(),//newid
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			color: req.body.color,
            talle: req.body.talle,
			description: req.body.description,
			image: "default-image.png"
		}
        products.push(newProduct)
        fs.writeFileSync(
            productsFilePath,JSON.stringify(products,null, 4),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/home')
    },
    edit: (req,res)=>{
        const idFound = +req.params.id
        const ProductsId = products.find(pro => pro.id === idFound)
        res.render('edit-Product',{ProductsId})
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
            productsFilePath,JSON.stringify(products,null, 4),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/home')
    },
    delete: (req, res)=>{
        const idDelete = +req.params.id
		const something = products.filter((user)=> user.id != idDelete)
        res.render('delete the product')

        fs.writeFileSync(
			productsFilePath,JSON.stringify(something,null,4),
			{
				encoding: "utf-8"
			}
		
		)
		res.redirect('/home')
    }
};
module.exports = controller;