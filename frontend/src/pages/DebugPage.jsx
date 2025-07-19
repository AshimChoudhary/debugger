import { useState, useRef } from 'react';
import axios from 'axios';
import CodeEditor from '../component/CodeEditor';
import UploadForm from '../component/UploadForm';
import DebugResult from '../component/DebugResult';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const DebugPage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [logFile, setLogFile] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logText, setLogText] = useState('');

  const resultRef = useRef(null);

  const handleSubmit = async () => {
    if (!code.trim()) {
      return toast.error('Please paste some code to debug.');
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('code', code);
      formData.append('language', language || 'plaintext');
      formData.append('model', 'gemini'); // fixed to Gemini
      if (logFile) formData.append('log', logFile);
      if (screenshot) formData.append('screenshot', screenshot);
      formData.append('logText', logText);

      const res = await axios.post(
        'http://localhost:5001/api/debug/analyze',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(res.data);
      toast.success('Debugging Complete');
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('DEBUG ANALYZE ERROR:', err?.response || err);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-4 max-w-5xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        🧠 Multimodal Code Debug Assistant
      </motion.h2>

      {/* Removed Model Selector */}

      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
      />

      <UploadForm
        setLogFile={setLogFile}
        setScreenshot={setScreenshot}
        logText={logText}
        setLogText={setLogText}
      />

      <div className="text-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-3 rounded-2xl text-white transition font-semibold ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Now!'}
        </motion.button>
      </div>

      {result && (
        <div ref={resultRef}>
          <DebugResult result={result} />
        </div>
      )}
    </motion.div>
  );
};

export default DebugPage;
