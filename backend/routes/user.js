const express = require('express');
const userCtrl = require('../controllers/user')
const checkToken = require('../middlewares/token/check') 

const router = express.Router();

/* GET home page. */
router.get('/:id', checkToken, userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;
