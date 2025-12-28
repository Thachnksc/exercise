import React from "react";

export default function StudentDashboard({ userName, scores }) {
  return (
    <div>
      <h2>Hello: {userName}</h2>
      <h2>Scores</h2>
      <table border="1">
        <thead>
          <tr><th>#</th><th>Score</th></tr>
        </thead>
        <tbody>
          {scores.length === 0
            ? <tr><td colSpan="2">No score yet</td></tr>
            : scores.map((score, idx) => <tr key={idx}><td>{idx + 1}</td><td>{score}</td></tr>)
          }
        </tbody>
      </table>
    </div>
  );
}
