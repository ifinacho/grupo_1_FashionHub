const fs = require('fs');
const path = require('path');
const accountsFilePath = path.join(__dirname, '../data/usersDataBase.json')
const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'))

function userMiddleware(req, res, next) {
    res.locals.isLogged = Boolean(req.session.userLogger);
    res.locals.userLogged = req.session.userLogged;
    next();
}

module.exports = userMiddleware;

/*let emailCookie = req.session.userEmail;
    let userFound = accounts.find(account => account.email === emailCookie)
    if(userFound){
        req.session.userLogged = userFound;
    }
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }*/