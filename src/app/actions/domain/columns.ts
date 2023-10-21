import { Columns } from "@/types";

export const columns: Columns = [
  { label: "ID", key: "ActionId", sortable: true },
  { label: "DATE", key: "AssignedOn", sortable: true },
  { label: "REPORTED", key: "ReportedBy", sortable: true },
  { label: "ASSIGNED", key: "AssignedTo", sortable: true },
  { label: "ITEM", key: "Item", sortable: true },
  { label: "STATUS", key: "Status", sortable: true },
  { label: "ACUTENESS", key: "Acuteness", sortable: true },
  { label: "CENTER", key: "Center", sortable: true },
  { label: "ACTIONS", key: "Actions", sortable: true }
];
