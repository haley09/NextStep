import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="landing-page">
      <div className="landing-card">
        <p className="eyebrow">NextStep</p>
        <h1>Job matching for seekers and employers</h1>
        <p className="landing-text">NextStep is a role-based job matching platform where job seekers can discover opportunities,
             like jobs, match with employers, and chat. Employers can post jobs, view applications, manage conversations, and find the right candidates.
        </p>

        <div className="landing-actions">
          <Link to="/login" className="primary-button">
            Login
          </Link>
          <Link to="/register" className="secondary-button">
            Register
          </Link>
        </div>

        <div className="landing-grid">
          <div className="landing-feature">
            <h2>For Job Seekers</h2>
            <p>Discover job opportunities, match with employers, and chat with potential employers.</p>
          </div>
          <div className="landing-feature">
            <h2>For Employers</h2>
            <p>Post jobs, view applications, manage conversations, and find the right candidates.</p>
          </div>
        </div>

      </div>
    </section>
  );
}