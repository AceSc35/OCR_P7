const express = require('express');
const router = express.Router();

//Controllers

const postController = require('../controllers/post.controllers');
//const commentController = require('../controllers/comment.controllers')

// Middlewares

const multer = require('../middlewares/multer.middlewares');
//const auth = require('../middlewares/auth.middlewares');

//Routes CRUD

router.post('/', multer, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.put('/:id', multer, postController.updatePost);
router.delete('/:id', multer, postController.deletePost);

//Comments

//router.post('/comment-post/:id', commentController.commentPost)
//router.delete('/delete-comment-post/:id', commentController.deleteCommentPost)
//router.get('/comments/:id', commentController.getComments)

//A voir

//router.patch('/edit-comment-post/:id', commentController.editCommentPost)

// A voir

//router.patch('like-post/:id', postController.likePost)
//router.patch('unlike-post/:id', postController.unlikePost)

module.exports = router;
