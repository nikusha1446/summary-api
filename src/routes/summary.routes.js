import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createSummarySchema } from '../validators/summary.validator.js';
import {
  createSummary,
  deleteSummary,
  getSummariesByDocumentId,
} from '../controllers/summary.controller.js';

const router = express.Router();

router.post('/', authenticate, validate(createSummarySchema), createSummary);
router.get('/document/:documentId', authenticate, getSummariesByDocumentId);
router.delete('/:id', authenticate, deleteSummary);

export default router;
