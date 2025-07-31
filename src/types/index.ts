export type SortField = "name" | "clientType" | "email" | "createdAt" | "updatedAt" | "id" | "status" | "updatedBy";

export type SortCriterion = {
  id: string;
  field: SortField;
  direction: "asc" | "desc";
};

export type ClientType = "All" | "Individual" | "Company";
