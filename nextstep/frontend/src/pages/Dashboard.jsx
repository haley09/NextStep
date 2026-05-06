import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me/");
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  function handleJobChange(event) {
    setJobForm({
      ...jobForm,
      [event.target.name]: event.target.value,
    });
  }

  async function handleJobSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await api.post("/jobs/create/", jobForm);

      setMessage("Job posted successfully!");
      setJobForm({
        title: "",
        company: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to post job.");
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          {user.role === "employer" && (
            <div>
              <h2>Create Job</h2>

              <form
                onSubmit={handleJobSubmit}
                style={{ maxWidth: "400px", display: "grid", gap: "1rem" }}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={handleJobChange}
                  required
                />

                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={jobForm.company}
                  onChange={handleJobChange}
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={jobForm.location}
                  onChange={handleJobChange}
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={jobForm.description}
                  onChange={handleJobChange}
                  required
                />

                <button type="submit">Post Job</button>
              </form>

              {message && <p>{message}</p>}
            </div>
          )}

          {user.role === "job_seeker" && (
            <p>Use the Jobs page to discover and swipe on available jobs.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}