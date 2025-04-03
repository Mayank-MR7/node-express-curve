const express = require('express');
const router = express.Router();
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser} = require('../controllers/user')



//POST API
router.post ('/', handleCreateUser)

//GET ALL USERS
router.get('/', handleGetAllUsers);

//GET USER BY ID
router.get('/:id', handleGetUserById);


//UPDATE USER
router.put('/:id', handleUpdateUserById);


//DELETE USER
router.delete('/:id', handleDeleteUserById)

module.exports = {
    router,
};