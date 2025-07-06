import express from 'express';
import {  addComment, createDiscussionPost, discussionDelete, getallpost } from '../controllers/discussion.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();

router.route('/discussionpost').post(isAuthenticated, createDiscussionPost);
router.route('/get').get( getallpost);
router.route('/discussion/:id/comment').post(isAuthenticated,addComment);
router.route('/discussion/:id').delete(isAuthenticated,discussionDelete);

export default router;
 