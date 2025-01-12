import Category from '../db/models/category.js';
import Blog from '../db/models/blog.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      data: {
        success: true,
        categories,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        success: false,
        message: 'Something went wrong.',
      },
    });
  }
};

export const getCategoryBlogs = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      data: {
        success: false,
        message: 'Category ID is required.',
      },
    });
  }

  try {
    const blogs = await Blog.find({ category: id })
      .select('-description')
      .populate('author', 'name email');
    res.status(200).json({
      data: {
        success: true,
        blogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        success: false,
        message: 'Something went wrong.',
      },
    });
  }
};
