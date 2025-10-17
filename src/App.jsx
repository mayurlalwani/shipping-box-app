import React, { useState } from "react";
import { BoxProvider } from "./state/BoxContext";
import Navbar from "./components/Navbar";
import AddBoxView from "./views/AddBoxView";
import ListBoxesView from "./views/ListBoxesView";

function App() {
  const [view, setView] = useState("add"); // Default to AddBoxView

  return (
    <BoxProvider>
      <div className="app-shell">
        <header className="site-header">
          <div className="brand">Shipping Box</div>
          <Navbar view={view} setView={setView} />
        </header>
        {view === "add" ? <AddBoxView /> : <ListBoxesView />}
      </div>
    </BoxProvider>
  );
}

export default App;
