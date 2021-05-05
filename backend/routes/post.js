const router = require('express').Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer');

router.get('/', postCtrl.getAllPosts)
router.get('/user/:id', postCtrl.getAllPostsByUserId)
router.get('/:id', postCtrl.getOnePost)
router.post('/',multer, postCtrl.createPost)
router.put('/', postCtrl.updatePost)
router.delete('/:id', postCtrl.deletePost)


module.exports = router