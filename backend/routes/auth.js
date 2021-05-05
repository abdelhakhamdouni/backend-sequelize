const router = require('express').Router();

const signupCtrl = require('../guard/signup')
const findUserCtrl = require('../guard/login')
const hashPass = require('../middlewares/bcrypt/hash')
const checkPass = require('../middlewares/bcrypt/check')
const tokenCtrl = require('../middlewares/token/send')
const multer = require('../middlewares/multer')


/* GET users listing. */
router.post('/signup',multer, hashPass, signupCtrl);
router.post('/login', findUserCtrl, checkPass, tokenCtrl)

module.exports = router;
