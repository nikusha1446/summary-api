import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createSummarySchema } from '../validators/summary.validator.js';
import { createSummary } from '../controllers/summary.controller.js';

const router = express.Router();

router.post('/', authenticate, validate(createSummarySchema), createSummary);

export default router;
