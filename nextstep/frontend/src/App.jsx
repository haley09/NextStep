import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import api from "./services/api";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import LikedJobs from "./pages/LikedJobs";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("access");

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const data = await api.get("/auth/me/");
        setUser(data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }

    loadUser();
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login");
  }

  const isEmployer = user?.role === "employer";

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand">
            NextStep
          </Link>

          <div className="nav-links">
            {!user && (
              <>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {user && (
              <>
                <Link to="/dashboard">Dashboard</Link>

                {isEmployer ? (
                  <>
                    <Link to="/liked">Jobs Posted</Link>
                    <Link to="/matches">Applicants</Link>
                    <Link to="/chats">Conversations</Link>
                  </>
                ) : (
                  <>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/liked">Liked Jobs</Link>
                    <Link to="/matches">Matches</Link>
                    <Link to="/chats">Chats</Link>
                  </>
                )}

                <button className="logout-button" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
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