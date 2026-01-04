export default function StudentDashboard({
    userName,
    scores,
}: {
    userName: string;
    scores: number[];
}) {
    return (
    <>
        <h2 className="mb-2">Hello {userName}</h2>
        <ul className="list-disc pl-5">
            {scores.length === 0
            ? <li>No score yet</li>
            : scores.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
    </>
    );
}
