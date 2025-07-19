import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

export const testGeminiConnection = async () => {
  try {
    console.log('🧪 Testing Gemini API connection...');
    console.log('API Key present:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // List available models
    console.log('📋 Listing available models...');
    const models = await genAI.listModels();
    console.log(
      'Available models:',
      models.map((m) => m.name)
    );

    // Try to use gemini-1.5-pro
    console.log('🔧 Testing gemini-1.5-pro...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini test successful!');
    console.log('Response:', text);

    return true;
  } catch (error) {
    console.error('❌ Gemini test failed:', error.message);
    console.error('Full error:', error);
    return false;
  }
};

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testGeminiConnection().then((success) => {
    process.exit(success ? 0 : 1);
  });
}
