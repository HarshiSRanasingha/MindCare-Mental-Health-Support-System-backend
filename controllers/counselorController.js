import Counselor from '../models/counselorModel.js';

// CREATE COUNSELOR
export const createCounselor = async (req, res) => {

  try {

    const counselor = await Counselor.create(req.body);

    res.status(201).json(counselor);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// GET COUNSELORS
export const getCounselors = async (req, res) => {

  try {

    const counselors = await Counselor.find();

    res.json(counselors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};