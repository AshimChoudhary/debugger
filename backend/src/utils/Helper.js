import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export const analyzeWithGemini = async ({ code, language, log }) => {
  try {
    console.log(
      '🔧 Initializing Gemini with API key:',
      process.env.GEMINI_API_KEY ? 'Present' : 'Missing'
    );

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Use the most reliable model name
    const modelName = 'gemini-1.5-pro';
    console.log(`🔧 Using model: ${modelName}`);

    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `
You are an expert debugging assistant. Analyze the following code and provide a detailed explanation of potential issues and solutions.

CODE (${language || 'unknown language'}):
${code}

${
  log
    ? `LOGS:
${log}`
    : ''
}

Please provide:
1. A detailed analysis of the code
2. Potential issues and their causes
3. Suggested fixes and improvements
4. Best practices to follow

Format your response clearly with sections and code examples where appropriate.
`;

    console.log('🔧 Sending prompt to Gemini...');
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();
    console.log('✅ Gemini response received');

    return {
      aiExplanation: text,
      aiFix: code,
      success: true,
    };
  } catch (error) {
    console.error('❌ Gemini Error:', error.message);
    console.error('❌ Full error:', error);

    if (error.message.includes('API key')) {
      throw new Error(
        'Invalid or missing Gemini API key. Please check your .env file.'
      );
    } else if (error.message.includes('404')) {
      throw new Error(
        'Gemini model not found. Please check your API key and model name.'
      );
    } else if (
      error.message.includes('429') ||
      error.message.includes('quota') ||
      error.message.includes('Too Many Requests')
    ) {
      console.log('⚠️ Rate limited - providing fallback analysis');
      const fallbackAnalysis = `
⚠️ **Rate Limit Notice**: The Gemini API is currently rate limited. Here's a basic analysis:

**Code Analysis**:
- Language: ${language || 'Unknown'}
- Code length: ${code.length} characters
- Lines: ${code.split('\n').length}

**Basic Suggestions**:
1. Check for syntax errors in your code
2. Verify all variables are properly declared
3. Ensure proper indentation and formatting
4. Look for missing semicolons or brackets
5. Check for typos in function or variable names

**Next Steps**:
- Wait a few minutes and try again
- Consider upgrading your Gemini API plan for higher limits
- Review the code manually for obvious issues

${
  log
    ? `**Log Analysis**:\nThe provided logs may contain error messages that can help identify the issue.`
    : ''
}
      `;

      return {
        aiExplanation: fallbackAnalysis,
        aiFix: code,
        success: false,
        rateLimited: true,
      };
    } else {
      throw new Error(`Failed to analyze with Gemini: ${error.message}`);
    }
  }
};
