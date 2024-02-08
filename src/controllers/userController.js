const controller = {
    login : (req, res) => {
        res.render("login")
    },
    register : (req, res) => {
        res.render("registro");
    }

};

module.exports = controller;