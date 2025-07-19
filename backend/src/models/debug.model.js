import mongoose from 'mongoose';

const debugSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'plaintext',
    },
    logText: {
      type: String,
      default: '',
    },
    logFileUrl: {
      type: String,
      default: '',
    },
    screenshotUrl: {
      type: String,
      default: '',
    },
    aiExplanation: {
      type: String,
      required: true,
    },
    aiFix: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: 'gemini',
    },
  },
  { timestamps: true }
);

const Debug = mongoose.model('Debug', debugSchema);

export default Debug;
