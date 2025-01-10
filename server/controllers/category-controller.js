import Category from '../db/models/category.js';

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
