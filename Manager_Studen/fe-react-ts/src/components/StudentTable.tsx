import type { Student } from "../types";

export default function StudentTable({ students }: { students: Student[] }) {
  return (
    <table className="w-full border mb-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">UserId</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Scores</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.userId}>
            <td className="border p-2">{s.userId}</td>
            <td className="border p-2">{s.userName}</td>
            <td className="border p-2">{s.roleName}</td>
            <td className="border p-2">
              {s.scores.length === 0 ? "No score" : s.scores.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
