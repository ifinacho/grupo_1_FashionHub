const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const accountsFilePath = path.join(__dirname, '../data/UsersDataBase.json')
const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'))

const controller = {
    login: (req, res)=> {
        const idFound = +req.params.id
        const User = accounts.find(U => U.id === idFound)
        res.render('login',{User})
    },
    loginPut : (req, res) => {
        const idFound = +req.params.id
        const {password, email}= req.body
		accounts.forEach(User => {
			if(User.id == idFound){
				User.password = password
				User.email = email
			}
		})
        fs.writeFileSync(
            accountsFilePath,JSON.stringify(accounts,null, 4),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/')
    },
    register : (req, res)=>{
        res.render("registro");
    },
    registerPost : (req, res) => {
        let newUser = {
			id: crypto.randomUUID(),
			name: req.body.name,
			username: req.body.username,
            password: req.body.password,
			dni: req.body.dni,
			birthdate: req.body.birthdate,
            email: req.body.email,
			image: "default-image.png"
		}
        accounts.push(newUser)
        fs.writeFileSync(
            accountsFilePath,JSON.stringify(accounts,null, 4),
            {
                encoding: "utf- 8"
            }
        )
        res.redirect('/')
    }

};

module.exports = controller;