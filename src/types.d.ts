export type ColumnData = {
  key: string;
  label: string;
  sortable?: boolean;
};

export type Columns = ColumnData[];

export type RowData = {
  [key: string]: any;
};

export type Rows = RowData[];

export type Centers = {
  CenterId: number;
  Center: string;
  Address: string;
  ManagerUsername: string;
  Contact: string;
}

export type Users = {
  UserId: number;
  Username: string;
  Email: null | string;
  Role: Role;
  Center: string;
}

export enum Role {
  It = "IT",
  Manager = "Manager",
  SystemAdministrator = "System Administrator",
}

export interface Acuteness {
  AcutenessId: number;
  Acuteness: string;
}

export type Actions = {
  ActionId: number;
  AssignedOn: Date;
  ReportedBy: string;
  ReportedByEmail: Email | null;
  AssignedTo: AssignedTo;
  AssignedToEmail: Email | null;
  Item: string;
  StatusId: number;
  Status: string;
  ActionDescription: string;
  Acuteness: string;
  AcutenessName: string;
  Center: string;
  Resolution: null | string;
}

export type Actions = Actions[]

export type Status = {
  StatusId: number;
  Status: string;
}
