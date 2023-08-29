const express = require("express"); //import express
const multer = require('multer');

const router = express.Router();
const userController = require("../controllers/users");

//Add a new user
router.post('/user', userController.addUser);

//Get user information
router.get('/user/:username', userController.getUser);

//Update user information
router.put('/user/:username', userController.updateUser);

//Delete user
router.delete('/user/:username', userController.deleteUser);

module.exports = router;
