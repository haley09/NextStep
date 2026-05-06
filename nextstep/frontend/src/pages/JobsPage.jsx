import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadJobs() {
    try {
      setLoading(true);
      setMessage("");

      const data = await api.get("/jobs/");
      setJobs(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleSwipe(liked) {
    const job = jobs[currentIndex];

    if (!job) return;

    try {
      await api.post("/jobs/swipe/", {
        job_id: job.id,
        liked,
      });

      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error(error);
      setMessage("Failed to save swipe.");
    }
  }

  async function handleStartOver() {
    try {
      setMessage("");

      await api.post("/jobs/reset-swipes/");

      await loadJobs();
    } catch (error) {
      console.error(error);
      setMessage("Failed to reset jobs.");
    }
  }

  if (loading) {
    return (
      <main className="page">
        <section className="card">
          <h1>Discover Jobs</h1>
          <p>Loading jobs...</p>
        </section>
      </main>
    );
  }

  const currentJob = jobs[currentIndex];

  return (
    <main className="page">
      <section className="card jobs-card">
        <h1>Discover Jobs</h1>

        {message && <p className="error-message">{message}</p>}

        {!currentJob ? (
          <div className="empty-state">
            <h2>No more jobs</h2>
            <p>You have reached the end of the current job list.</p>

            <button className="primary-button" type="button" onClick={handleStartOver}>
              Start Over
            </button>
          </div>
        ) : (
          <div className="job-swipe-card">
            <h2>{currentJob.title}</h2>
            <h3>{currentJob.company}</h3>
            <p>{currentJob.location}</p>
            <p>{currentJob.description}</p>

            <div className="swipe-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={() => handleSwipe(false)}
              >
                Pass
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={() => handleSwipe(true)}
              >
                Like
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default JobsPage;