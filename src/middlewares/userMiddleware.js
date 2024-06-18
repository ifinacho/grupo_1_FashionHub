const db = require("../database/models/");
async function userMiddleware(req, res, next) {
    res.locals.isLogged = Boolean(req.session.userLogged);
    res.locals.userLogged = req.session.userLogged;
    if (req.session.userLogged) {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id); //busca al usuario en la db
            if (!user) {
                delete req.session.userLogged;
                res.locals.isLogged = false;
                res.locals.userLogged = null
            }
        } catch (error) {
            console.error("Error al verificar usuario: ", error);
        }
    }
    next();
}
module.exports = userMiddleware;