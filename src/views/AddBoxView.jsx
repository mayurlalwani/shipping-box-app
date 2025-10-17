import React from "react";
import BoxForm from "../components/BoxForm";

export default function AddBoxView() {
  return (
    <main className="app-shell">
      <div className="card" style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="site-header">
          <div>
            <h2 style={{ margin: 0 }}>Add Box Details</h2>
          </div>
        </div>
        <BoxForm />
      </div>
    </main>
  );
}
