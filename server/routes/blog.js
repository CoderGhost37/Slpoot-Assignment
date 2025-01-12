import express from 'express';

import {
  createBlog,
  getAllBlogs,
  getBlog,
  getBlogTitleById,
} from '../controllers/blog-controller.js';

const router = express.Router();

router.post('/', getAllBlogs);
router.post('/create', createBlog);
router.get('/:id', getBlog);
router.get('/:id/name', getBlogTitleById);

export default router;
