import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
const DebugResult = ({ result }) => {
  const [typedExplanation, setTypedExplanation] = useState('');
  const [copied, setCopied] = useState(false);
  const explanation = result.aiExplanation;
  const isRateLimited = result.rateLimited;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.aiFix);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
      console.error('Copy failed:', err);
    }
  };

  useEffect(() => {
    setTypedExplanation('');
    let currentIndex = 0;

    const interval = setInterval(() => {
      setTypedExplanation((prev) => prev + explanation[currentIndex]);
      currentIndex++;

      if (currentIndex >= explanation.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [explanation]);

  useEffect(() => {
    hljs.highlightAll();
  }, [result.aiFix]);

  return (
    <motion.div
      className="mt-6 p-4 border rounded bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {isRateLimited && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
          <h4 className="font-semibold text-yellow-800">⚠️ Rate Limited</h4>
          <p className="text-yellow-700 text-sm">
            The Gemini API is currently rate limited. This is a basic analysis.
            Wait a few minutes and try again for a full AI-powered analysis.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">🛠 Fixed Code:</h3>
        <button
          onClick={copyToClipboard}
          className={`btn btn-sm gap-2 transition-all ${
            copied ? 'btn-success' : 'btn-outline'
          }`}
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Code
            </>
          )}
        </button>
      </div>
      <pre className="rounded border overflow-x-auto bg-white p-3">
        <code className="hljs language-javascript">{result.aiFix}</code>
      </pre>

      <h3 className="font-bold mt-6 mb-2 text-lg">📘 Explanation:</h3>
      <div className="bg-white p-3 border rounded whitespace-pre-wrap min-h-[100px] font-mono text-sm leading-relaxed">
        {typedExplanation}
        {typedExplanation.length < explanation.length && (
          <span className="animate-pulse">|</span>
        )}
      </div>
    </motion.div>
  );
};

export default DebugResult;
