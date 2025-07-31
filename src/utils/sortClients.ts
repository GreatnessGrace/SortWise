import type { Client } from "../data/clients";
import type { SortCriterion } from "../types";

export function sortClients(clients: Client[], criteria: SortCriterion[]): Client[] {
  return [...clients].sort((a, b) => {
    for (const { field, direction } of criteria) {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}
