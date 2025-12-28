import React from "react";

export default function StudentTable({ students }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>UserId</th>
          <th>Name</th>
          <th>Role</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.userId}>
            <td>{s.userId}</td>
            <td>{s.userName}</td>
            <td>{s.roleName}</td>
            <td>{s.score ?? "No score"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
