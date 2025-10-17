import React from "react";
import BoxTable from "../components/BoxTable";

export default function ListBoxesView() {
  return (
    <main className="app-shell">
      <div className="card" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="site-header">
          <div>
            <h2 style={{ margin: 0 }}>List of Shipping Boxes</h2>
            <div className="brand">Shipping Box Manager</div>
          </div>
        </div>
        <div className="table-responsive">
          <BoxTable />
        </div>
      </div>
    </main>
  );
}
