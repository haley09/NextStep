import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Matches() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMatchesOrApplicants() {
      try {
        const currentUser = await api.get("/auth/me/");
        setUser(currentUser);

        if (currentUser.role === "employer") {
          const applicants = await api.get("/jobs/applicants/");
          setItems(applicants);
        } else {
          const matches = await api.get("/jobs/matches/");
          setItems(matches);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load matches.");
      }
    }

    loadMatchesOrApplicants();
  }, []);

  const isEmployer = user?.role === "employer";

  return (
    <div>
      <h1>{isEmployer ? "Applicants" : "Matches"}</h1>

      {message && <p>{message}</p>}

      {items.length === 0 ? (
        <p>
          {isEmployer
            ? "No applicants yet. Applicants will appear here when job seekers like your posted jobs."
            : "No matches yet. Like jobs to create matches."}
        </p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {items.map((item) =>
            isEmployer ? (
              <div
                key={item.id}
                style={{
                  background: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h2>{item.applicant_email}</h2>
                <p>
                  <strong>Applied/Liked:</strong> {item.job_title}
                </p>
                <p>
                  <strong>Company:</strong> {item.company}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <Link to={`/chat/${item.job_id}`}>
                  Open Conversation
                </Link>
              </div>
            ) : (
              <div
                key={item.id}
                style={{
                  background: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h2>{item.title}</h2>
                <p>
                  <strong>Company:</strong> {item.company}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <Link to={`/chat/${item.id}`}>
                  Open Chat
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}