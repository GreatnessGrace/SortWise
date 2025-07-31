import { useEffect, useState } from "react";
import { clients as mockClients } from "./data/clients";
import { sortClients } from "./utils/sortClients";
import type { SortCriterion } from "./types";
import { SortPanel } from "./components/SortPanel";
import { ClientTable } from "./components/ClientTable";

function App() {
  const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>([]);
  const [sortedClients, setSortedClients] = useState(mockClients);
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false);

  useEffect(() => {
    setSortedClients(sortClients(mockClients, sortCriteria));
    localStorage.setItem("sortCriteria", JSON.stringify(sortCriteria));
  }, [sortCriteria]);

  useEffect(() => {
    const saved = localStorage.getItem("sortCriteria");
    if (saved) setSortCriteria(JSON.parse(saved));
  }, []);

  const handleSortClick = () => {
    setIsSortPanelOpen(true);
  };

  const handleSortPanelClose = () => {
    setIsSortPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <ClientTable 
          clients={sortedClients} 
          onSortClick={handleSortClick}
          activeSorts={sortCriteria.length}
        />
        
        <SortPanel 
          sortCriteria={sortCriteria} 
          setSortCriteria={setSortCriteria}
          isOpen={isSortPanelOpen}
          onClose={handleSortPanelClose}
        />
      </div>
    </div>
  );
}

export default App;
