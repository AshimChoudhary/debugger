import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axio.js';
import HistoryItem from '../component/HistoryItem';
import toast from 'react-hot-toast';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/debug/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
        toast.error('Failed to load debug history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading your debug history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">🕘 Your Debug History</h2>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No debug sessions yet</p>
            <p className="text-gray-500">
              Start debugging your code to see your history here!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <HistoryItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
