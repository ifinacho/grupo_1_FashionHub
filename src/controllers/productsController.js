const crypto = require('crypto')
const db = require("../database/models/");
const { error } = require('console');

const controller = {
    //details - muestra los detalles de todos los productos
    details : async (req, res) => {
        const listColor = await db.Color.findAll();
        const listSize = await db.Size.findAll();

        db.Product.findByPk(req.params.id)
        .then(product => {
            product.color = listColor.find(c => c.id === product.colorId)?.name;
            product.size = listSize.find(s => s.id === product.sizeId)?.name;
            res.render("product-detail", {product})
        })
        .catch(error => {
            console.error(error);
        });
    },
    
    create: async(req, res)=> {
        const listCategory = await db.Category.findAll();
        const listColor = await db.Color.findAll();
        const listSize = await db.Size.findAll();
        res.render('create-product', {listCategory, listColor, listSize});
    },
    createPost: (req,res)=>{
        db.Product.create({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            categoryId: req.body.category,
            colorId: req.body.color,
            sizeId: req.body.size
            //userId buscar manera de obtenerlo
        }).then((product) => {
            res.redirect(`/product-detail/${product.id}`);
        }).catch(error => {
            console.error(error);
        });
    },

    edit: async(req,res)=>{
        const listCategory = await db.Category.findAll();
        const listColor = await db.Color.findAll();
        const listSize = await db.Size.findAll();
        db.Product.findByPk(req.params.id)
        .then(product => {
            res.render("edit-product", {product, listColor,listCategory,listSize})
        })
        .catch(error => {
            console.error(error);
        });
    },
    editPut: (req, res)=>{
        db.Product.update({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            categoryId: req.body.category,
            colorId: req.body.color,
            sizeId: req.body.size
        },{
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect(`/product-detail/${req.params.id}`);
        })
        .catch(error => {
            console.error(error);
        });
    },
    delete: (req, res)=>{
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect("/")
        })
        .catch(error => {
            console.error(error);
        });
    }
};
module.exports = controller;