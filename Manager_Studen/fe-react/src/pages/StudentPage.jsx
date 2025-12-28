import React, { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import StudentDashboard from "../components/StudentDashboard";

export default function StudentPage() {
  const [userName, setUserName] = useState("");
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const loadScores = async () => {
      const res = await API.get("/score");
      setUserName(res.data.userName);
      setScores(res.data.scores || []);
    };
    loadScores();
  }, []);

  return (
    <div className="container">
      <h1>Student Dashboard</h1>
      <button className="logout-btn" onClick={logout}>Logout</button>
      <StudentDashboard userName={userName} scores={scores} />
    </div>
  );
}
