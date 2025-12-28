import React, { useState } from "react";
import API from "../api/api"; 


export default function CreateStudentForm({ onCreate }) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!userId || !userName || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await API.post("/students/create", { userId, userName, password });

    setSuccess(res.data.message);

    onCreate?.({ userId, userName, score: null });

    setUserId(""); 
    setUserName(""); 
    setPassword("");

  } catch (err) {

    const message = err.response?.data?.message || "Server error";
    setError(message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      
   
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <text> User Id: </text>
      <input placeholder="UserId" value={userId} onChange={e => setUserId(e.target.value)} />
      <text> User Name: </text>
      <input placeholder="UserName" value={userName} onChange={e => setUserName(e.target.value)} />
      <text> Password: </text>  
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Create Student</button>
    </form>
  );
}
