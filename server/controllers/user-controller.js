import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../db/models/user.js';
import { loginSchema } from '../schemas/login.js';
import { registerSchema } from '../schemas/register.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const validateFields = loginSchema.safeParse(req.body);

  if (!validateFields.success) {
    return res.status(400).json({
      data: {
        success: false,
        message: validateFields.error.errors[0].message,
      },
    });
  }

  const { email, password } = validateFields.data;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({
        data: {
          success: false,
          message: "User doesn't exist",
        },
      });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({
        data: {
          success: false,
          message: 'Invalid passowrd',
        },
      });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      data: {
        token,
        success: true,
        message: 'User logged in successfully',
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

export const register = async (req, res) => {
  const validateFields = registerSchema.safeParse(req.body);

  if (!validateFields.success) {
    return res.status(400).json({
      data: {
        success: false,
        message: validateFields.error.errors[0].message,
      },
    });
  }

  const { email, password, name } = validateFields.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        data: {
          success: false,
          message: 'User already exist',
        },
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(201).json({
      data: {
        success: true,
        message: 'User registered successfully',
        token,
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
