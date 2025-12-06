import React from "react";
import "./SearchSortBar.css";

export default function SearchSortBar({
  q,
  onQ,
  sort,
  onSort,
  filter,
  onFilter
}: {
  q: string;
  onQ: (s: string) => void;
  sort: string;
  onSort: (s: string) => void;
  filter: "all" | "completed" | "pending";
  onFilter: (f: "all" | "completed" | "pending") => void;
}) {
  return (
    <div className="search-sort">
      <input className="search-input" placeholder="Search tasks..." value={q} onChange={(e)=>onQ(e.target.value)} />
      <div className="controls">
        <select value={sort} onChange={(e)=>onSort(e.target.value)} className="select">
          <option value="due">Sort: Due date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>

        <select value={filter} onChange={(e)=>onFilter(e.target.value as any)} className="select">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
