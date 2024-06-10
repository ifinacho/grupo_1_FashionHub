const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const db = require("../database/models/")
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const controller= {
    create: (req, res)=> {
        res.render('create-product')
    },
    createPost: (req,res)=>{
        db.Product.create({
            id: crypto.randomUUID(),
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            color: req.body.color,
            size: req.body.size

        }).then(newProduct => {
            res.redirect("/Coleccion");
        }).catch(error => {
            console.error(error);
        });

        /*let newProduct = {
			id: crypto.randomUUID(),//newid
			name: req.body.name,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			color: req.body.color,
            talle: req.body.talle,
			description: req.body.description,
            image: req.file.filename,
            category: req.body.category			
		}

        console.log(newProduct)

        products.push(newProduct)

        fs.writeFileSync(productsFilePath, JSON.stringify(products,null, 4))
        
        */
    },
}

module.exports = controller;