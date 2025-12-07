import PomodoroTimer from "./PomodoroTimer";
import "./PomodoroOverlay.css";

export default function PomodoroOverlay({
  task,
  onClose
}: {
  task: any;
  onClose: () => void;
}) {
  return (
    <div className="pomo-overlay">

      <div className="pomo-overlay-left">
        <PomodoroTimer 
          taskTitle={task.title} 
          onClose={onClose}
          overlay
        />
      </div>

      <div className="pomo-overlay-right">
        <h2>{task.title}</h2>
        <p><strong>Due:</strong> {task.date}</p>
        <p>{task.description}</p>

        {task.teamNames && task.teamNames.length > 0 && (
          <div className="overlay-team">
            <h4>Team Members</h4>
            <ul>
              {task.teamNames.map((m: string) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
