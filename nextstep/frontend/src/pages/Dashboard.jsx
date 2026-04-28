import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access");

      try {
        const response = await api.get("/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}