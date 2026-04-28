import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import LikedJobs from "./pages/LikedJobs";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            NextStep
          </Link>

          <div className="flex items-center gap-5 text-sm font-medium">
            <Link className="hover:text-blue-600" to="/">
              Login
            </Link>
            <Link className="hover:text-blue-600" to="/register">
              Register
            </Link>
            <Link className="hover:text-blue-600" to="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-blue-600" to="/jobs">
              Jobs
            </Link>
            <Link className="hover:text-blue-600" to="/liked">
              Liked Jobs
            </Link>
            <Link className="hover:text-blue-600" to="/matches">
              Matches
            </Link>
            <Link className="hover:text-blue-600" to="/chats">
              Chats
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/liked" element={<LikedJobs />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:jobId" element={<Chat />} />
      </Routes>
      </main>
    </div>
  );
}