import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState("Loading matches...");

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("access");

      try {
        const response = await api.get("/jobs/matches/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMatches(response.data);
        setMessage("");
      } catch (error) {
        console.error(error);
        setMessage("Could not load matches.");
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1>Your Matches</h1>

      {message && <p>{message}</p>}

      {matches.length > 0 ? (
        matches.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
              maxWidth: "500px",
              background: "white",
            }}
          >
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p> {job.description}</p>
            <Link to={`/chat/${job.id}`}> Open Chat </Link>
          </div>
        ))
      ) : (
        !message && <p>No matches yet. Start swiping!</p>
      )}
    </div>
  );
}