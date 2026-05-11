import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function Chat() {
  const { jobId } = useParams();

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const isEmployer = user?.role === "employer";

  async function loadMessages() {
    try {
      const data = await api.get(`/jobs/messages/${jobId}/`);
      setMessages(data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load conversation.");
    }
  }

  useEffect(() => {
    async function loadPageData() {
      try {
        const currentUser = await api.get("/auth/me/");
        setUser(currentUser);
        await loadMessages();
      } catch (error) {
        console.error(error);
        setMessage("Failed to load conversation.");
      }
    }

    loadPageData();
  }, [jobId]);

  async function handleSendMessage(event) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      await api.post(`/jobs/messages/${jobId}/`, {
        content,
      });

      setContent("");
      await loadMessages();
    } catch (error) {
      console.error(error);
      setMessage("Failed to send message.");
    }
  }

  return (
    <section>
      <Link to="/chats" className="text-link">
        ← {isEmployer ? "Back to conversations" : "Back to chats"}
      </Link>

      <div className="chat-container">
        <div className="chat-header">
          <h1 className="page-title">
            {isEmployer ? "Applicant Conversation" : "Conversation"}
          </h1>

          <p>
            {isEmployer
              ? "Coordinate next steps with this applicant."
              : "Coordinate next steps for this job match."}
          </p>
        </div>

        {message && <p className="message-error">{message}</p>}

        <div className="chat-body">
          {messages.length === 0 ? (
            <p>
              {isEmployer
                ? "No conversation yet. Send a message to this applicant."
                : "No messages yet. Send a message to start the conversation."}
            </p>
          ) : (
            messages.map((item) => {
              const isMine = item.sender === user?.email;

              return (
                <div
                  key={item.id}
                  className={`message-row ${isMine ? "mine" : "theirs"}`}
                >
                  <div
                    className={`message-bubble ${isMine ? "mine" : "theirs"}`}
                  >
                    <p className="message-sender">{item.sender}</p>
                    <p>{item.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            placeholder={
              isEmployer ? "Message this applicant..." : "Type a message..."
            }
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}