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
    <div>
      <Link to="/chats" className="text-blue-600 hover:underline">
        ← {isEmployer ? "Back to conversations" : "Back to chats"}
      </Link>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">
            {isEmployer ? "Applicant Conversation" : "Conversation"}
          </h1>

          <p className="text-gray-600 mt-1">
            {isEmployer
              ? "Coordinate next steps with this applicant."
              : "Coordinate next steps for this job match."}
          </p>
        </div>

        {message && (
          <p className="p-4 text-red-600 font-medium">
            {message}
          </p>
        )}

        <div className="p-6 min-h-[360px] space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">
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
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-sm rounded-xl px-4 py-3 ${
                      isMine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-xs opacity-75 mb-1">{item.sender}</p>
                    <p>{item.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 flex gap-3"
        >
          <input
            type="text"
            placeholder={
              isEmployer
                ? "Message this applicant..."
                : "Type a message..."
            }
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}