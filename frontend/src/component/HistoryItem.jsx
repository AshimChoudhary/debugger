import React from 'react';

const HistoryItem = ({ item }) => {
  const { code, language, aiFix, aiExplanation, createdAt, logText } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-lg border border-base-300"
    >
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="card-title text-lg">Debug Session</h3>
            <p className="text-sm text-base-content/60">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
          <div className="badge badge-primary">{language}</div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">🧑‍💻 Original Code:</h4>
            <pre className="bg-base-200 p-3 text-sm rounded-lg overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>

          {logText && (
            <div>
              <h4 className="font-semibold mb-2">📄 Logs:</h4>
              <pre className="bg-base-200 p-3 text-sm rounded-lg overflow-x-auto">
                <code>{logText}</code>
              </pre>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">📘 AI Analysis:</h4>
            <div className="bg-base-200 p-3 text-sm rounded-lg">
              <p className="whitespace-pre-wrap">{aiExplanation}</p>
            </div>
          </div>

          {aiFix && aiFix !== code && (
            <div>
              <h4 className="font-semibold mb-2">🛠 Suggested Fix:</h4>
              <pre className="bg-green-50 p-3 text-sm rounded-lg overflow-x-auto border border-green-200">
                <code>{aiFix}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryItem;
