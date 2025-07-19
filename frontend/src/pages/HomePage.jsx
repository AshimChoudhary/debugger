import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { CloudCog } from 'lucide-react';

const HomePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* your HomePage content */}

      <div className="p-24 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {authUser?.fullName || 'Developer'} 👋
        </h1>

        <p className="text-gray-700 mb-6">
          Your personal AI debugging assistant. Paste your code, upload logs or
          screenshots, and get AI powered suggestions to fix your bugs faster.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link
            to="/debug"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition flex items-center gap-2"
          >
            <CloudCog className="size-5" />
            <span>Debug Now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
