import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import Counselor from "../models/counselorModel.js";

import generateToken from "../utils/generateToken.js";


// REGISTER USER
export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// REGISTER COUNSELOR
export const registerCounselor = async (req, res) => {

  try {

    const { name, email, password, specialization } = req.body;

    const counselorExists = await Counselor.findOne({ email });

    if (counselorExists) {

      return res.status(400).json({
        message: "Counselor already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const counselor = await Counselor.create({
      name,
      email,
      password: hashedPassword,
      specialization
    });

    res.status(201).json({
      _id: counselor._id,
      name: counselor.name,
      email: counselor.email,
      role: counselor.role,
      token: generateToken(counselor._id, counselor.role)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    let account =
      await User.findOne({ email }) ||
      await Counselor.findOne({ email });

    if (!account) {

      return res.status(401).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      account.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    res.json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role: account.role,
      token: generateToken(account._id, account.role)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};