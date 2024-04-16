const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const uploadFile = require("../middlewares/uploadFile.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { body } = require("express-validator");

let validations = [
    body("name").notEmpty().withMessage("Por favor, ingresa un nombre"),
    body("lastName").notEmpty().withMessage("Por favor, ingresa un apellido"),
    body("dni").notEmpty().withMessage("Por favor, ingresa un DNI"),
    body("fotoPerfil").custom((value, { req }) => {
        let file = req.file
        if(!file){
            throw new Error("Tienes que subir una imagen");
        }
        return true;
    }),
    body("birthdate").notEmpty().withMessage("Por favor, ingresa una fecha de nacimiento"),
    body("email").notEmpty().withMessage("Por favor, ingresa un email").bail()
                .isEmail().withMessage("Por favor, ingresa un formato de email válido"),
    body("repeatEmail").custom((value, { req }) => {
        if(value !== req.body.email){
            throw new Error("El email no se repite correctamente");
        }
        return true;
    }),
    body("password").notEmpty().withMessage("Por favor, ingresa una contraseña"),
    body("repeatPassword").custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error("La contraseña no se repite correctamente");
        }
        return true;
    })
]

router.get("/login", guestMiddleware, userController.login);
router.post("/login", userController.loginPost);
router.get("/register", guestMiddleware, userController.register);
router.post("/register", uploadFile.single("fotoPerfil"), validations, userController.registerPost);
router.get("/profile", authMiddleware, userController.profile);
router.get("/logout", userController.logout);

module.exports = router;