const express = require('express');
const { registerController, loginController } = require('../controller/auth');

const router = express.Router();

// POST /auth/login
router.post('/login', loginController);
router.post('/register', registerController);


module.exports = router;