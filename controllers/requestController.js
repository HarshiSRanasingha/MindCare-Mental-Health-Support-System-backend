import Request from "../models/requestModel.js";


// CREATE REQUEST
export const createRequest = async (req, res) => {

  try {

    const request = await Request.create({
      userId: req.user.id,
      issue: req.body.issue
    });

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// GET ALL REQUESTS
export const getRequests = async (req, res) => {

  try {

    const requests = await Request.find()
      .populate("userId")
      .populate("counselorId");

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE REQUEST
export const updateRequest = async (req, res) => {

  try {

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRequest);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE REQUEST
export const deleteRequest = async (req, res) => {

  try {

    await Request.findByIdAndDelete(req.params.id);

    res.json({
      message: "Request Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};