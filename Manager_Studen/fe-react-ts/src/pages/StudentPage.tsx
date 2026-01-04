import { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import StudentDashboard from "../components/StudentDashboard";
import type { ScoreResponse } from "../types";

export default function StudentPage() {
    const [data, setData] = useState<ScoreResponse | null>(null);

    useEffect(() => {
    API.get("/score").then(res => setData(res.data));
    }, []);

    if (!data) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6">
        <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">Student Dashboard</h1>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
            </button>
        </div>

        <StudentDashboard userName={data.userName} scores={data.scores} />
        </div>
    );
}
