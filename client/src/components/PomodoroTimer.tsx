import { useState, useRef, useEffect } from "react";
import "./PomodoroTimer.css";

export type PomodoroMode = "work" | "break-short" | "break-long";

export default function PomodoroTimer({
  taskTitle,
  onClose,
  overlay
}: {
  taskTitle?: string;
  onClose?: () => void;
  overlay?: boolean;
}) {
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  const [mode, setMode] = useState<PomodoroMode>("work");
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" + sec : sec}`;
  };

  const start = () => {
    if (running) return;
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          nextStage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current!);
  };

  const reset = () => {
    stop();
    if (mode === "work") setSeconds(WORK_TIME);
    if (mode === "break-short") setSeconds(SHORT_BREAK);
    if (mode === "break-long") setSeconds(LONG_BREAK);
  };

  const nextStage = () => {
    stop();

    if (mode === "work") {
      const newCount = cycles + 1;
      setCycles(newCount);

      if (newCount % 4 === 0) {
        setMode("break-long");
        setSeconds(LONG_BREAK);
      } else {
        setMode("break-short");
        setSeconds(SHORT_BREAK);
      }
    } else {
      setMode("work");
      setSeconds(WORK_TIME);
    }
  };

  const skip = () => nextStage();

  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
  <div className="pomodoro-box">

    {overlay && (
      <button className="pomo-close-btn" onClick={onClose}>×</button>
    )}

    {taskTitle && <h3 className="pomo-task-title">{taskTitle}</h3>}

    <h1 className="pomo-time">{format(seconds)}</h1>

    <p className="pomo-mode">
      {mode === "work" && "Focus Time"}
      {mode === "break-short" && "Short Break"}
      {mode === "break-long" && "Long Break"}
    </p>

    <div className="pomo-btns">
      {!running ? (
        <button onClick={start} className="pomo-start">Start</button>
      ) : (
        <button onClick={stop} className="pomo-stop">Stop</button>
      )}
      <button onClick={reset} className="pomo-reset">Reset</button>
      <button onClick={skip} className="pomo-skip">Skip</button>
    </div>

    <p className="pomo-cycles">Pomodoros: {cycles % 4}/4</p>
  </div>
);

}
