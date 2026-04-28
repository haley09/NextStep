import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("Loading jobs...");
  const [lastAction, setLastAction] = useState("");
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs/");
        setJobs(response.data);
        setMessage("");
      } catch (error) {
        console.error(error.response?.data || error.message);
        setMessage("Could not load jobs.");
      }
    };

    fetchJobs();
  }, []);

  const handleSwipe = async (dir) => {
    const currentJob = jobs[currentIndex];
    const token = localStorage.getItem("access");
    const liked = dir === "right";

    if (!currentJob) return;

    setDirection(dir);

    try {
      await api.post(
        "/jobs/swipe/",
        {
          job_id: currentJob.id,
          liked: liked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
      if (liked) {
        setLastAction(`You liked ${currentJob.title}`);
      } else {
        setLastAction(`You passed on ${currentJob.title}`);
      }

      setCurrentIndex((prevIndex) => prevIndex + 1);
      setDirection(null);
      }, 250); // Delay to allow animation to complete
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const currentJob = jobs[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-4">Discover Jobs</h1>

      {lastAction && <p className="mb-4 text-gray-600">{lastAction}</p>}

      {currentJob && (
        <motion.div
          key={currentJob.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: direction === "right" ? 500 : direction === "left" ? -500 : 0,
            rotate: direction === "right" ? 12 : direction === "left" ? -12 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-2">
            {currentJob.title}
          </h2>

          <p className="text-gray-700">
            <span className="font-semibold">Company:</span>{" "}
            {currentJob.company}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Location:</span>{" "}
            {currentJob.location}
          </p>

          <p className="mt-4 text-gray-600">
            {currentJob.description}
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleSwipe("left")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition"
            >
              Pass
            </button>

            <button
              onClick={() => handleSwipe("right")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transition"
            >
              Interested
            </button>
          </div>
        </motion.div>
      )}

      {!currentJob && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            No more jobs
          </h2>
          <button
            onClick={() => setCurrentIndex(0)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}