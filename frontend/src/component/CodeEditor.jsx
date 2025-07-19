import React, { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import { AnimatePresence, motion } from 'framer-motion';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('csharp', csharp);

const CodeEditor = ({ code, setCode, language, setLanguage }) => {
  useEffect(() => {
    if (code.trim().length > 10) {
      const result = hljs.highlightAuto(code, [
        'javascript',
        'python',
        'java',
        'cpp',
        'csharp',
      ]);
      if (result.language) {
        setLanguage(result.language);
      }
    }
  }, [code, setLanguage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block mb-2 font-semibold">Paste Your Code Below:</label>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-64 p-2 border font-mono rounded-2xl"
      />

      <AnimatePresence>
        {language && (
          <motion.p
            key={language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-gray-500 mt-2"
          >
            Detected Language:{' '}
            <span className="font-medium capitalize">{language}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodeEditor;
