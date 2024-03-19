const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const accountsFilePath = path.join(__dirname, '../data/usersDataBase.json')
const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'))
const { validationResult } = require("express-validator")

const controller = {
    login: (req, res)=> {
        const idFound = req.params.id
        const User = accounts.find(U => U.id === idFound)
        res.render('login',{User})
    },
    loginPost : (req, res) => {
        const idFound = +req.params.id
        const {password, email}= req.body
		accounts.forEach(User => {
			if(User.id == idFound){
				User.password = password
				User.email = email
			}
		})
        fs.writeFileSync(
            accountsFilePath,JSON.stringify(accounts,null, 4)
        )
        res.redirect('/')
    },
    register : (req, res)=>{
        res.render("registro");
    },
    registerPost : (req, res) => {

        const validations = validationResult(req)
        if (!validations.isEmpty()){
            res.render("registro", { errors: validations.mapped(), oldData: req.body })
        }else{
            let newUser = {
                id: crypto.randomUUID(),
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                dni: req.body.dni,
                birthdate: req.bosdy.birthdate,
                email: req.body.email,
                image: req.file.filename
            }
            accounts.push(newUser)
            fs.writeFileSync(
                accountsFilePath,JSON.stringify(accounts,null, 4)
            )
            res.redirect('/')
        }
    }
};

module.exports = controller;