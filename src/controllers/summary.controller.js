import Document from '../models/document.model.js';
import Summary from '../models/summary.model.js';
import { generateSummary } from '../utils/openai.util.js';

export const createSummary = async (req, res) => {
  try {
    const { documentId, style } = req.body;
    const userId = req.user._id;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        error: 'Document not found',
      });
    }

    if (document.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error:
          'Access denied. You do not have permission to summarize this document',
      });
    }

    const summaryContent = await generateSummary(document.content, style);

    const summary = await Summary.create({
      content: summaryContent,
      style,
      documentId,
    });

    res.status(201).json({
      message: 'Summary created successfully',
      summary: {
        id: summary._id,
        content: summary.content,
        style: summary.style,
        documentId: summary.documentId,
        createdAt: summary.createdAt,
      },
    });
  } catch (error) {
    console.error('Create summary error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid document ID format',
      });
    }

    if (error.message === 'Failed to generate summary') {
      return res.status(503).json({
        error: 'Failed to generate summary. Please try again later.',
      });
    }

    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getSummariesByDocumentId = async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.user._id;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        error: 'Document not found',
      });
    }

    if (document.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error:
          'Access denied. You do not have permission to view summaries for this document',
      });
    }

    const summaries = await Summary.find({ documentId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      document: {
        id: document._id,
        title: document.title,
        content: document.content,
      },
      summaries: summaries.map((summary) => ({
        id: summary._id,
        content: summary.content,
        style: summary.style,
        createdAt: summary.createdAt,
      })),
      count: summaries.length,
    });
  } catch (error) {
    console.error('Get summaries error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid document ID format',
      });
    }

    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
