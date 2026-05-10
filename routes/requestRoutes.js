import express from 'express';

import {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest
} from '../controllers/requestController.js';

const router = express.Router();

router.post('/requests', createRequest);

router.get('/requests', getRequests);

router.put('/requests/:id', updateRequest);

router.delete('/requests/:id', deleteRequest);

export default router;