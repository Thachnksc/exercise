import { useState } from "react";
import API from "../api/api";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await API.post("/login", { userName, password });
            setAuth(res.data.token, res.data.user.roleName, res.data.user.userName);
            navigate(res.data.user.roleName === "admin" ? "/admin" : "/student");
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />

        <input
            type="password"
            className="w-full border p-2 mb-4 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
        </button>
        </form>
    </div>
  );
}
