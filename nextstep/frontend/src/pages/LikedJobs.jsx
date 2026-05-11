import { useEffect, useState } from "react";
import api from "../services/api";

export default function LikedJobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const currentUser = await api.get("/auth/me/");
        setUser(currentUser);

        if (currentUser.role === "employer") {
          const postedJobs = await api.get("/jobs/posted/");
          setJobs(postedJobs);
        } else {
          const likedJobs = await api.get("/jobs/liked/");
          setJobs(likedJobs);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load jobs.");
      }
    }

    loadData();
  }, []);

  const isEmployer = user?.role === "employer";

  return (
    <div>
      <h1>{isEmployer ? "Jobs Posted" : "Liked Jobs"}</h1>

      {message && <p>{message}</p>}

      {jobs.length === 0 ? (
        <p>
          {isEmployer
            ? "You have not posted any jobs yet."
            : "You have not liked any jobs yet."}
        </p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{job.title}</h2>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}