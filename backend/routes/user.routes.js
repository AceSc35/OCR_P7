const express = require('express');
const router = express.Router();

//Controllers

const authController = require('../controllers/auth.controllers');
const userController = require('../controllers/user.controllers');

//Middlewares

const multer = require('../middlewares/multer.middlewares');

//Auth

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//Users

router.get('/:id', userController.getOneUser);
router.get('/', userController.getAllUsers);
router.put('/images/:id', multer, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
