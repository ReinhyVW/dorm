"use client";

import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

import { type Columns, type Rows } from '@/types'

const placeholderColumns: Columns = [
  { key: "UserId", label: "UserId" },
  { key: "Username", label: "Username" },
  { key: "Email", label: "Email" },
  { key: "Role", label: "Role" },
  { key: "Center", label: "Center" },
];

const placeholderRows: Rows = [
  {
    UserId: 1,
    Username: "Manuel Caballero",
    Email: null,
    Role: "System Administrator",
    Center: "Administration",
  }
];

export default function UserTable() {
  const [rows, setRows] = useState<Rows>(placeholderRows);
  const [columns, setColumns] = useState<Columns>(placeholderColumns);

  useEffect(() => {
    const fetchedColumns: Columns = [
      { key: "UserId", label: "UserId" },
      { key: "Username", label: "Username" },
      { key: "Email", label: "Email" },
      { key: "Role", label: "Role" },
      { key: "Center", label: "Center" },
    ];

    const fetchedRows: Rows = [
      {
        UserId: 1,
        Username: "Manuel Caballero",
        Email: null,
        Role: "System Administrator",
        Center: "Administration",
      }
    ];

    setColumns(fetchedColumns);
    setRows(fetchedRows);
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <Table selectionMode="single" aria-label="Example static collection table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.UserId.toString()}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
