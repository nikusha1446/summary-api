import Document from '../models/document.model.js';

export const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const document = await Document.create({
      title: title || undefined,
      content,
      userId,
    });

    res.status(201).json({
      message: 'Document created successfully',
      document: {
        id: document._id,
        title: document.title,
        content: document.content,
        userId: document.userId,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
    });
  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const documents = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Document.countDocuments({ userId });
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      documents: documents.map((doc) => ({
        id: doc._id,
        title: doc.title,
        content: doc.content,
        userId: doc.userId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalDocuments,
        limit,
      },
    });
  } catch (error) {
    console.error('Get all documents error:', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        error: 'Document not found',
      });
    }

    if (document.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error:
          'Access denied. You do not have permission to view this document',
      });
    }

    res.status(200).json({
      document: {
        id: document._id,
        title: document.title,
        content: document.content,
        userId: document.userId,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get document by ID error:', error);

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
