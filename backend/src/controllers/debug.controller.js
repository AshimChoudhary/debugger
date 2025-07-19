import { analyzeWithGemini } from '../utils/Helper.js';
import Debug from '../models/debug.model.js';

export const analyzeBug = async (req, res) => {
  try {
    const { code, language, logText } = req.body;
    const logFile = req.files?.log?.[0];
    const screenshot = req.files?.screenshot?.[0];
    const userId = req.user._id;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    let combinedLog = logText || '';
    if (logFile) {
      const fileContent = logFile.buffer.toString('utf-8');
      combinedLog = combinedLog
        ? `${combinedLog}\n\nFile Log:\n${fileContent}`
        : fileContent;
    }

    const result = await analyzeWithGemini({
      code,
      language: language || 'plaintext',
      log: combinedLog,
    });

    const debugSession = new Debug({
      userId,
      code,
      language: language || 'plaintext',
      logText: combinedLog,
      aiExplanation: result.aiExplanation,
      aiFix: result.aiFix,
      model: 'gemini',
    });

    await debugSession.save();

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ analyzeBug error:', error);
    res
      .status(500)
      .json({ message: 'Failed to analyze code', error: error.message });
  }
};

export const getDebugHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await Debug.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(history);
  } catch (error) {
    console.error('❌ getDebugHistory error:', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch history', error: error.message });
  }
};
