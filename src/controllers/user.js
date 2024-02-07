const controller = {
    login : (req, res) => {
        res.render("./views/login.ejs")
    },
    register : (req, res) => {
        res.render("./views/registro.ejs");
    }

};

module.exports = controller;