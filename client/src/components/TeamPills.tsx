export default function TeamPills({ team }: { team?: any[] }) {
  if (!team || team.length === 0) return null;

  return (
    <div className="team-pills">
      {team.map((u) => (
        <span key={u._id} className="team-pill">
          {u.name}
        </span>
      ))}
    </div>
  );
}
