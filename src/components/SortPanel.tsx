import { useState } from "react";
import type { SortCriterion, SortField } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  sortCriteria: SortCriterion[];
  setSortCriteria: (items: SortCriterion[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

const sortOptions = [
  {
    field: "name" as SortField,
    label: "Client Name",
    icon: "👤",
    options: ["↑ A-Z", "↓ Z-A"]
  },
  {
    field: "createdAt" as SortField,
    label: "Created At",
    icon: "📅",
    options: ["↑ Newest to Oldest", "↓ Oldest to Newest"]
  },
  {
    field: "updatedAt" as SortField,
    label: "Updated At",
    icon: "📅",
    options: ["↑ Newest to Oldest", "↓ Oldest to Newest"]
  },
  {
    field: "id" as SortField,
    label: "Client ID",
    icon: "🆔",
    options: ["↑ A-Z", "↓ Z-A"]
  }
];

export const SortPanel: React.FC<Props> = ({ sortCriteria, setSortCriteria, isOpen, onClose }) => {
  const [selectedField] = useState<SortField>("name");

  if (!isOpen) return null;

  () => {
    if (!sortCriteria.some((c) => c.field === selectedField)) {
      setSortCriteria([
        ...sortCriteria,
        { id: uuidv4(), field: selectedField, direction: "asc" },
      ]);
    }
  };

  const removeSort = (id: string) => {
    setSortCriteria(sortCriteria.filter((i) => i.id !== id));
  };

  const clearAll = () => {
    setSortCriteria([]);
  };

  const applySort = () => {
    onClose();
  };

   (criterion: SortCriterion) => {
    const option = sortOptions.find(opt => opt.field === criterion.field);
    if (!option) return "";
    
    if (criterion.field === "name" || criterion.field === "id") {
      return criterion.direction === "asc" ? "↑ A-Z" : "↓ Z-A";
    } else {
      return criterion.direction === "asc" ? "↑ Newest to Oldest" : "↓ Oldest to Newest";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Sort By</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {sortOptions.map((option) => (
            <div key={option.field} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium text-gray-900">{option.label}</span>
              </div>
              
              <div className="flex space-x-2">
                {option.options.map((opt, index) => {
                  const direction = index === 0 ? "asc" : "desc";
                  const isActive = sortCriteria.some(c => c.field === option.field && c.direction === direction);
                  
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (isActive) {
                          removeSort(sortCriteria.find(c => c.field === option.field && c.direction === direction)?.id || "");
                        } else {
                          // Remove existing sort for this field if any
                          const newCriteria = sortCriteria.filter(c => c.field !== option.field);
                          setSortCriteria([...newCriteria, { id: uuidv4(), field: option.field, direction }]);
                        }
                      }}
                      className={`flex-1 px-3 py-2 text-sm rounded border transition-colors ${
                        isActive 
                          ? "bg-blue-500 text-white border-blue-500" 
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              
                             {/* Remove button for active sorts */}
               {sortCriteria.some(c => c.field === option.field) && (
                 <div className="flex justify-end">
                   <button
                     onClick={() => {
                       const toRemove = sortCriteria.find(c => c.field === option.field);
                       if (toRemove) removeSort(toRemove.id);
                     }}
                     className="text-red-500 hover:text-red-700 text-sm"
                   >
                     ✕
                   </button>
                 </div>
               )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between items-center">
          <button
            onClick={clearAll}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Clear all
          </button>
          <button
            onClick={applySort}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
};
