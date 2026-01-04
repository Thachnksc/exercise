import type { Student, Stats } from "../types";
import StudentTable from "./StudentTable";
import CreateStudentForm from "./CreateStudentForm";

export default function AdminDashboard({
    students,
    stats,
    onCreate,
}: {
    students: Student[];
    stats: Stats | null;
    onCreate: (s: Student) => void;
}) {
    return (
    <>
    <StudentTable students={students} />

    <table className="border w-full mb-4">
        <tbody>
            <tr>
                <td className="border p-2">Total</td>
                <td className="border p-2">{stats?.totalStudentsHaveScore ?? 0}</td>
            </tr>
        </tbody>
    </table>
    
    <h2 className="border inline-block px-2 py-1 mb-4 font-bold">Create Student</h2>
    <CreateStudentForm onCreate={onCreate} />
    </>
  );
}
