"use client"

import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";

import OptionCell from "./OptionCell";
import TableText from "./TableText";
import UserSelect from "@/components/inputs/UserSelect";
import CenterSelect from "@/components/inputs/CenterSelect"
import AcutenessSelect from "@/components/inputs/AcutenessSelect"; 

export default function MeetingTable({ columns, rows, id, }: { columns: any; rows: any; id: string; }) {
  type Row = typeof rows[0];

  const renderCell = useCallback((row: Row, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case "list":
        return row.Item;

      case "comments":
        return <TableText title="Comment" id={row.ItemId + "-comment-meetingData"} item={row.Item} />

      case "reported":
        return <UserSelect selectedUser="" id={row.ItemId + "-reported-action"} />;

      case "assigned":
        return <UserSelect selectedUser="" id={row.ItemId + "-assigned-action"} />;

      case "center":
        return <CenterSelect selectedCenter="" id={row.ItemId + "-center-action"} />;

      case "description":
        return <TableText title="Description" id={row.ItemId + "-description-action"} item={row.Item} />

      case "acuteness":
        return <AcutenessSelect defaultAcuteness="1" id={row.ItemId + "-acuteness-action"} />

      default:
        return <OptionCell id={`${columnKey.toString()}-${row.ItemId}-meetingData`} />;
    }
  }, []);

  const renderAttendanceCell = useCallback((row: Row, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case "list":
        return row.Item;

      case "comments":
        return (
          <></>
        );

      case "reported":
        return <></>

      case "assigned":
        return <></>

      case "center":
        return <></>

      case "description":
        return (
          <></>
        );

      case "acuteness":
        return <></>

      default:
        return <OptionCell id={`${columnKey.toString()}-${row.ItemId}-meetingData`} />;
    }
  }, []);

  return (
    <div aria-hidden="true">
      <Table
        className="grid-flow-col"
        selectionMode="none"
        aria-label={`Meeting Table with data for the ${id}`}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column?.key || column?.label}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={rows} emptyContent={<h1>No content to display</h1>}>
          {rows.map((item: any) => (
            <TableRow key={item.ItemId} id={item.ItemId}>
              {columns.map((column: any) => (
                <TableCell className="w-auto" key={`${column.key}-${item.ItemId}`}>
                  {renderCell(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
