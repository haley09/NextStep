import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Chats() {
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState("Loading chats...");

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
        console.error(error.response?.data || error.message);
        setMessage("Could not load chats.");
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Chats</h1>

      {message && <p>{message}</p>}

      {!message && matches.length === 0 && (
        <p>No chats yet. Match with a job first.</p>
      )}

      <div className="grid gap-4 max-w-2xl">
        {matches.map((job) => (
          <Link
            key={job.id}
            to={`/chat/${job.id}`}
            className="block bg-white rounded-xl shadow p-5 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="mt-2 text-blue-600">Open chat →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}