export type Client = {
  id: string;
  name: string;
  clientType: "Individual" | "Company";
  email: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
};

export const clients: Client[] = [
  {
    id: "20",
    name: "Ankush",
    clientType: "Individual",
    email: "ankush@email.com",
    status: "Active",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
    updatedBy: "hello world",
  },
  {
    id: "21",
    name: "Test Test",
    clientType: "Individual",
    email: "test@test.com",
    status: "Active",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-18",
    updatedBy: "hello world",
  },
  {
    id: "22",
    name: "Dev Dev",
    clientType: "Company",
    email: "contact@dev.com",
    status: "Active",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-15",
    updatedBy: "admin",
  },
  {
    id: "23",
    name: "Akshat",
    clientType: "Individual",
    email: "akshat@email.com",
    status: "Inactive",
    createdAt: "2024-12-20",
    updatedAt: "2025-01-10",
    updatedBy: "system",
  },
  {
    id: "24",
    name: "Tech",
    clientType: "Company",
    email: "info@tech.com",
    status: "Active",
    createdAt: "2024-12-15",
    updatedAt: "2025-01-12",
    updatedBy: "manager",
  },
];
