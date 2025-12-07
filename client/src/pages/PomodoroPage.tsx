import PomodoroTimer from "../components/PomodoroTimer";
import "./PomodoroPage.css";

export default function PomodoroPage() {
  return (
    <div className="pomo-page">
      <div className="pomo-center">
        <PomodoroTimer />
      </div>
    </div>
  );
}
