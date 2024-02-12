const controller = {
    create: (req, res)=> {
        res.render('Create-product')
    },
    createPost: (req,res)=>{
        res.render('Create-product-POST')
    },
    details : (req, res) => {
        res.render("product-detail");
    },
    edit: (req,res)=>{
        res.render('edit-Product')
    },
    editPut: (req, res)=>{
        res.render('Edit-Product-PUT')
    },
    delete: (req, res)=>{
        res.render('delete the product')
    }
};
module.exports = controller;