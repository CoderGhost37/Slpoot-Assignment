import Blog from '../db/models/blog.js';
import { blogSchema } from '../schemas/blog.js';

export const createBlog = async (req, res) => {
  const validateFields = blogSchema.safeParse(req.body);

  if (!validateFields.success) {
    return res.status(400).json({
      data: {
        success: false,
        message: validateFields.error.errors[0].message,
      },
    });
  }

  const { title, description, imgUrl, category, userId } = validateFields.data;

  try {
    const blog = await Blog.create({
      title,
      description,
      imgUrl,
      category,
      author: userId,
    });
    res.status(201).json({
      data: {
        success: true,
        message: 'Blog created successfully',
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

export const getBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      data: {
        success: false,
        message: 'Blog ID is required.',
      },
    });
  }

  try {
    const blog = await Blog.findById(id).populate('author', 'name email');
    res.status(200).json({
      data: {
        success: true,
        blog,
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

export const getBlogTitleById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      data: {
        success: false,
        message: 'Blog ID is required.',
      },
    });
  }

  try {
    const blog = await Blog.findById(id).select('title');
    res.status(200).json({
      data: {
        success: true,
        blog,
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

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select('_id');
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
