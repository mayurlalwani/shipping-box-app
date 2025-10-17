import React from "react";

export default function Navbar({ view, setView }) {
  return (
    <nav className="nav-actions" role="navigation" aria-label="Main navigation">
      <button
        className={`nav-btn ${view === "add" ? "active" : ""}`}
        onClick={() => setView("add")}
        aria-pressed={view === "add"}
      >
        Add Box
      </button>
      <button
        className={`nav-btn ${view === "list" ? "active" : ""}`}
        onClick={() => setView("list")}
        aria-pressed={view === "list"}
      >
        Box List
      </button>
    </nav>
  );
}
