import React from "react";
import StudentTable from "./StudentTable";
import CreateStudentForm from "./CreateStudentForm";

export default function AdminDashboard({ students, stats, onCreate }) {
  return (
    <div>
      <h2>Students List</h2>
      <StudentTable students={students} />

      <h2>Statistics</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Total Students Have Score</th>
            <th>Total Score</th>
            <th>Highest Score</th>
            <th>Lowest Score</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.totalStudentsHaveScore ?? 0}</td>
            <td>{stats.totalScore ?? 0}</td>
            <td>{stats.highestScore ?? 0}</td>
            <td>{stats.lowestScore ?? 0}</td>
            <td>{stats.averageScore ?? 0}</td>
          </tr>
        </tbody>
      </table>

      <h2>Create Student</h2>
      <CreateStudentForm onCreate={onCreate} />
    </div>
  );
}


