import { useState } from "react";
import API from "../api/api";
import type { Student } from "../types";

export default function CreateStudentForm({
  onCreate,
}: {
  onCreate: (s: Student) => void;
}) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/students/create", { userId, userName, password });

      if (res.data.success) {
        setMsg("Student created successfully");
        onCreate({ userId, userName, roleName: "student", scores: [] });

        setUserId("");
        setUserName("");
        setPassword("");
      } else {
        setMsg(res.data.message || "Failed to create student");
      }
    } catch (err: any) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
        {msg && <p className="text-green-600">{msg}</p>}
        <input className="border p-2 w-full" placeholder="UserId" value={userId} onChange={e => setUserId(e.target.value)} />
        <input className="border p-2 w-full" placeholder="UserName" value={userName} onChange={e => setUserName(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
