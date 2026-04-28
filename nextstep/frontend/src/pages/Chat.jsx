import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export default function Chat() {
  const { jobId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Loading chat...");

  const currentUserEmail = localStorage.getItem("userEmail");

  const fetchMessages = async () => {
    const token = localStorage.getItem("access");

    try {
      const response = await api.get(`/jobs/messages/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
      setStatus("");
    } catch (error) {
      console.error("Chat load error:", error.response?.data || error.message);
      setStatus("Could not load chat.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [jobId]);

  const sendMessage = async () => {
    const token = localStorage.getItem("access");

    if (!input.trim()) return;

    try {
      await api.post(
        `/jobs/messages/${jobId}/`,
        { content: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInput("");
      fetchMessages();
    } catch (error) {
      console.error("Send message error:", error.response?.data || error.message);
      setStatus("Could not send message.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/chats" className="text-blue-600 hover:underline">
        ← Back to chats
      </Link>

      <div className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b p-5">
          <h1 className="text-2xl font-bold">Conversation</h1>
          <p className="text-gray-500 text-sm">Coordinate next steps for this match.</p>
        </div>

        <div className="p-5 min-h-96 max-h-96 overflow-y-auto bg-gray-50">
          {status && <p className="text-gray-600">{status}</p>}

          {messages.length === 0 && !status && (
            <p className="text-gray-500">No messages yet. Start the conversation.</p>
          )}

          {messages.map((msg) => {
            const isMe = msg.sender === currentUserEmail;

            return (
              <div
                key={msg.id}
                className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 shadow-sm ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {!isMe && (
                    <p className="text-xs text-gray-500 mb-1">{msg.sender}</p>
                  )}
                  <p>{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t p-4 flex gap-3 bg-white">
          <input
            className="flex-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}