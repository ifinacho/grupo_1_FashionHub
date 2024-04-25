const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const bcryptjs = require("bcryptjs")
const accountsFilePath = path.join(__dirname, '../data/usersDataBase.json')
const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'))
const { validationResult } = require("express-validator")

const controller = {
    login: (req, res)=> {
        const idFound = req.params.id
        const User = accounts.find(U => U.id === idFound)
        res.render("login",{User})
    },
    loginPost : (req, res) => {
        let userFound = accounts.find(account => account.email === req.body.email)
        if(userFound){
            let okPassword = bcryptjs.compareSync(req.body.password, userFound.password)
            if(okPassword){
                delete userFound.password
                req.session.userLogged = userFound
                if(req.body.remember-me){
                    res.cookie("userEmail", req.body.email, { maxAge: 1000*60*60 })
                }
                return res.redirect("/user/profile")
            }else{
                return res.render("login", { errors: { email: { msg: "Las credenciales son inválidas"}}})
            }
        }
        return res.render("login", { errors: { email: { msg: "No se encuentra este email en nuestra base de datos"}}})
    },
    register : (req, res)=>{
        res.render("registro");
    },
    registerPost : (req, res) => {

        const validations = validationResult(req)
        if (!validations.isEmpty()){
            return res.render("registro", { errors: validations.mapped(), oldData: req.body })
        }
        let userFound = accounts.find(account => account.email === req.body.email)
        if(userFound){
            return res.render("registro", { errors: { email: { msg: "Este email ya está registrado"}}, oldData: req.body })
        }
        let newUser = {
            id: crypto.randomUUID(),
            name: req.body.name,
            lastName: req.body.username,
            password: bcryptjs.hashSync(req.body.password, 10),
            dni: req.body.dni,
            birthdate: req.body.birthdate,
            email: req.body.email,
            fotoPerfil: req.file.filename
        }
        accounts.push(newUser)
        fs.writeFileSync(
            accountsFilePath,JSON.stringify(accounts,null, 4)
        )
        return res.redirect("/user/login")
    },
    profile : (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        if(req.session){
            res.clearCookie("userEmail");
            req.session.destroy();
            return res.redirect("/")
        }
    }
};

module.exports = controller;