const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

//CARRITO
const carritoFilepath = path.join(__dirname, '..data/carritoDataBase.json')

const controller = {
    index: (req, res) => {

        res.render("shopping-cart",{products});
    },
    checkout: (req, res) => {
        const buttonAdd = document.querySelector("#button-add")
        const buttonAddId = buttonAdd.id
        let listadeCompras =[]
        const comprar = products.filter(clickUser => clickUser.id === buttonAddId)
        listadeCompras.push(...comprar)

        fs.writeFileSync(
            carritoFilepath,JSON.stringify(listadeCompras, null,4),
            {
                encoding: 'utf-8'
            }

        )
        res.render("check");
    },
    cancelShopping: (req,res) => {
        /*const idDelete = +req.params.id
		const something = products.filter((Deleteuser)=> Deleteuser.id != idDelete)
        res.render('delete the product')

        fs.writeFileSync(
			productsFilePath,JSON.stringify(something,null,4),
			{
				encoding: "utf-8"
			}
		
		)*/

        

    },
};
module.exports = controller;