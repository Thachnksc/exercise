import { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import AdminDashboard from "../components/AdminDashboard";
import type { Student, Stats } from "../types";

export default function AdminPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
    API.get("/students").then(res => setStudents(res.data.students));
    API.get("/students/stats").then(res => setStats(res.data));
    }, []);

    return (
    <div className="p-6">
        <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>

        <AdminDashboard
            students={students}
            stats={stats}
            onCreate={(s) => setStudents(prev => [...prev, s])}
        />
    </div>
  );
}
