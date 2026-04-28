import { useState } from "react";
import api from "../services/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    role: "job_seeker",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await api.post("/auth/register/", formData);
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage("Registration failed.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>NextStep Register</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "grid", gap: "1rem" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}