export type ColumnData = {
  key: string;
  label: string;
};

export type Columns = ColumnData[];

export type RowData = {
  [key: string]: any;
};

export type Rows = RowData[];

export interface Centers {
  CenterId: number;
  Center: string;
  Address: string;
  ManagerUsername: string;
  Contact: string;
}

export interface Users {
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
  acutenessId: number;
  acutenessName: string;
}