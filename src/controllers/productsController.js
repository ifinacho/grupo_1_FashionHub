const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const db = require("../database/models/");
const { error } = require('console');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const controller = {
    // home - muestra todos los productos
    index: (req, res) => {
		res.render('home', {products});
	},
    
    //details - muestra los detalles de todos los productos
    details : (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            res.render("product-detail", {product})
        })
        .catch(error => {
            console.error(error);
        });
        /*console.log(req.params.id)
        const idFound = req.params.id
        const product = products.find(product => product.id == idFound)
        console.log(product)
        res.render("product-detail", {product});*/
    },
    
    create: (req, res)=> {
        res.render('create-product');
    },
    createPost: (req,res)=>{
        db.Product.create({
            /*id: crypto.randomUUID(),*/
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
    },

    edit: (req,res)=>{
        const colors = ["naranja", "blanco", "Rojo"]; // EN algun momento la conssulta a la base
        db.Product.findByPk(req.params.id)
        .then(product => {
            res.render("edit-product", {product, colors})
        })
        .catch(error => {
            console.error(error);
        });
        /*const idFound = req.params.id
        const product = products.find(product => product.id == idFound)
        res.render('edit-product', {product});*/
    },
    editPut: (req, res)=>{
        db.Product.update({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            color: req.body.color,
            size: req.body.size

        },{
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect("/Coleccion")
        })
        .catch(error => {
            console.error(error);
        });
        /*console.log(req.params.id)
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

        res.redirect('/Coleccion')*/
    },
    delete: (req, res)=>{
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect("/Coleccion")
        })
        .catch(error => {
            console.error(error);
        });
        /*const idDelete = req.params.id
		const productsDeleted = products.filter((product)=> product.id != idDelete)

        fs.writeFileSync(productsFilePath,JSON.stringify(productsDeleted, null, 4))

		res.redirect('/Coleccion')*/
    }
};
module.exports = controller;