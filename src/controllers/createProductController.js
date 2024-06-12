const crypto = require('crypto')
const db = require("../database/models/")


const controller= {
    create: (req, res)=> {
        res.render('create-product');
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
    },
}

module.exports = controller;