import React, { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({});

  const loadStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.students);
  };

  const loadStats = async () => {
    const res = await API.get("/students/stats");
    setStats(res.data);
  };

  const handleCreateStudent = ({ userId, userName, score }) => {
    setStudents(prev => [...prev, { userId, userName, score }]);
  };

  useEffect(() => {
    console.log("JWT token:", localStorage.getItem("token"));
    loadStudents();
    loadStats();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn" onClick={logout}>Logout</button>
      <AdminDashboard students={students} stats={stats} onCreate={handleCreateStudent} />
    </div>
  );
}
