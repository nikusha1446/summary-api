import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createSummarySchema } from '../validators/summary.validator.js';
import {
  createSummary,
  getSummariesByDocumentId,
} from '../controllers/summary.controller.js';

const router = express.Router();

router.post('/', authenticate, validate(createSummarySchema), createSummary);
router.get('/document/:documentId', authenticate, getSummariesByDocumentId);

export default router;
