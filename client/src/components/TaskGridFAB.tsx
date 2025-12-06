import React from "react";
import "./TaskGridFAB.css";

export default function TaskGridFAB({ onClick }: { onClick: () => void }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Add task">
      <div className="fab-inner">＋</div>
      <span className="fab-text">New task</span>
    </button>
  );
}
