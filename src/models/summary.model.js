import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Summary content is required'],
    },
    style: {
      type: String,
      enum: {
        values: ['brief', 'detailed', 'bullet-points'],
        message: '{VALUE} is not a valid summary style',
      },
      required: [true, 'Summary style is required'],
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
  },
  { timestamps: true }
);

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
