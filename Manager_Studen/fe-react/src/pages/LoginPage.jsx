import React, { useState } from "react";
import API from "../api/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { userName, password });
      if (res.status === 200) {
        setToken(res.data.token, res.data.user.roleName, res.data.user.userName);
        if (res.data.user.roleName === "admin") navigate("/admin");
        else navigate("/student");
      }
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
