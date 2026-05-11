import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Chats() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadChats() {
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
        setMessage("Failed to load conversations.");
      }
    }

    loadChats();
  }, []);

  const isEmployer = user?.role === "employer";

  return (
    <section className="card">
      <h1 className="page-title">{isEmployer ? "Conversations" : "Chats"}</h1>

      {message && <p className="error-message">{message}</p>}

      {items.length === 0 ? (
        <div className="empty-state">
          <p>
            {isEmployer
              ? "No conversations yet. Conversations will appear when applicants like your posted jobs."
              : "No chats yet. Match with jobs to start conversations."}
          </p>
        </div>
      ) : (
        <div className="grid-list">
          {items.map((item) =>
            isEmployer ? (
              <article className="chat-card" key={item.id}>
                <h2>{item.applicant_email}</h2>

                <p>
                  <strong>Job:</strong> {item.job_title}
                </p>

                <p>
                  <strong>Company:</strong> {item.company}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <Link className="text-link" to={`/chat/${item.job_id}`}>
                  Open Conversation
                </Link>
              </article>
            ) : (
              <article className="chat-card" key={item.id}>
                <h2>{item.title}</h2>

                <p>
                  <strong>Company:</strong> {item.company}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <Link className="text-link" to={`/chat/${item.id}`}>
                  Open Chat
                </Link>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}