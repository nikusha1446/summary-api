import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createDocumentSchema } from '../validators/document.validator.js';
import {
  createDocument,
  getAllDocuments,
} from '../controllers/document.controller.js';

const router = express.Router();

router.post('/', authenticate, validate(createDocumentSchema), createDocument);
router.get('/', authenticate, getAllDocuments);

export default router;
