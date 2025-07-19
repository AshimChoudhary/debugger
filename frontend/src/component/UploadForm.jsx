import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const UploadForm = ({ setLogFile, setScreenshot, logText, setLogText }) => {
  const [useTextLog, setUseTextLog] = useState(false);

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block font-semibold">Log Source:</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!useTextLog}
              onChange={() => setUseTextLog(false)}
            />
            Upload File
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={useTextLog}
              onChange={() => setUseTextLog(true)}
            />
            Paste Log Text
          </label>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!useTextLog ? (
          <motion.div
            key="file-upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block font-semibold">
              Upload Log File (.log/.txt):
            </label>
            <input
              type="file"
              accept=".log,.txt"
              onChange={(e) => setLogFile(e.target.files[0])}
            />
          </motion.div>
        ) : (
          <motion.div
            key="text-log"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block font-semibold mb-4">Paste Log Text:</label>
            <textarea
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="Paste your log here..."
              className="w-full h-32 p-2 border  rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label className="block font-semibold">
          Upload Screenshot (optional):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setScreenshot(e.target.files[0])}
        />
      </motion.div>
    </motion.div>
  );
};

export default UploadForm;
