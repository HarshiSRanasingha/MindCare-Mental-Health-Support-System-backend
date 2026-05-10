import express from 'express';

import {
  createCounselor,
  getCounselors
} from '../controllers/counselorController.js';

const router = express.Router();

router.post('/counselors', createCounselor);

router.get('/counselors', getCounselors);

export default router;