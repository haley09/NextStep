import { useEffect, useState } from "react";
import api from "../services/api";

export default function LikedJobs() {
  const [jobs, setJobs] = useState([]);

    useEffect(() => {
      const fetchLiked = async () => {
        const token = localStorage.getItem("access");

        try {
          const response = await api.get("/jobs/liked/", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setJobs(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchLiked();
    }, []);

    return (
        <div>
            <h1>Liked Jobs</h1>

            {jobs.map(job => (
                <div key={job.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    </div>
            ))}
        </div>
    );
}