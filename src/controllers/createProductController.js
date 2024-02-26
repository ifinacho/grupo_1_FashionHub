const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const controller= {
    create: (req, res)=> {
        res.render('create-product')
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
            category: req.body.category,
			image: req.body.image
		}
        products.push(newProduct)
        fs.writeFileSync(
            productsFilePath,JSON.stringify(products,null, 2),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/home')
    },
}

module.exports = controller;