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
