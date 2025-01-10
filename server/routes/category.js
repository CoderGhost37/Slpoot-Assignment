import express from 'express';

import {
  getAllCategories,
  getCategoryBlogs,
} from '../controllers/category-controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryBlogs);

export default router;
