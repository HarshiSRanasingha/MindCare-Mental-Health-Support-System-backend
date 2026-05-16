import Counselor from "../models/counselorModel.js";

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