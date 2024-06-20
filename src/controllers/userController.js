const db = require("../database/models/");
const crypto = require('crypto');
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const controller = {
    login: (req, res) => {
        res.render("login")
    },
    loginPost: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("/");
        }
        try {
            const user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (user && bcryptjs.compareSync(req.body.password, user.password)) {
                req.session.userLogged = user;
                if (req.body.rememberMe) {
                    res.cookie("userEmail", user.email, { maxAge: 1000 * 60 * 2 })
                }
                res.render("userProfile", {
                    user: req.session.userLogged
                });
            } else {
                return res.render("login", { errors: { email: { msg: "Las credenciales son inválidas" } } });
            }
        } catch (error) {
            console.error("Error al iniciar session", error);
            return res.status(500).send("error interno del servidor");
        }
    },
    register: (req, res) => {
        res.render("registro");
    },
    registerPost: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('registro', { errors: errors.mapped(), oldData: req.body }); // Asegúrate de tener la vista 'registro'
        }
        try {
            const existingUser = await db.User.findOne({
                where: { email: req.body.email }
            });
            if (existingUser) {
                return res.render("registro", {
                    errors: { email: { msg: "Este email ya está registrado" } },
                    oldData: req.body
                });
            }
            const newUser = {
                name: req.body.name,
                lastName: req.body.lastName,
                password: bcryptjs.hashSync(req.body.password, 10),
                dni: req.body.dni,
                birthdate: req.body.birthdate,
                email: req.body.email,
                profilePhoto: req.file ? req.file.filename : 'default.jpg', // Asignar una imagen por defecto si no se subió ninguna
            };
            await db.User.create(newUser); //creara el nuevo usuario a traves de sequealize
            return res.redirect("/user/login");
        } catch (error) {
            console.error("error al registrar al usuario", error);
            return res.status(500).send("error interno dle servidor");
        }
    },
    profile: (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        if (req.session) {
            res.clearCookie("userEmail");
            req.session.destroy();
            return res.redirect("/")
        }
    }
};
module.exports = controller;