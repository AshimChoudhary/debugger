import Navbar from './component/Navbar';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import ProfilePage from './pages/ProfilePage';
import DebugPage from './pages/DebugPage';
import HistoryPage from './pages/HistoryPage';

import SettingsPage from './pages/SettingsPage';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const { authUser, checkAuth, isChekingAuth, handleOAuthRedirect } =
    useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    handleOAuthRedirect();
  }, [checkAuth, handleOAuthRedirect]);

  console.log({ authUser });

  if (isChekingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <div data-theme={theme}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LogInPage /> : <Navigate to="/" />}
          />
          <Route
            path="/debug"
            element={authUser ? <DebugPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={authUser ? <HistoryPage /> : <Navigate to="/login" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};
export default App;
