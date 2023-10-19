// "use client"

// import React, { useEffect, useState } from "react";

// import {
//   Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
//   Input, Button,
//   DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
//   Chip, ChipProps, User,
//   Pagination, Selection,
//   SortDescriptor
// } from "@nextui-org/react";
// import { Icon } from "@tremor/react";
// import { PlusIcon, DotsVerticalIcon, SearchIcon, ChevronDownIcon } from "@heroicons/react/solid";

// import { getActions } from "@/adapters/dataGetters/getActions";

// import { Actions, Columns, RowData, Rows } from "@/types";

// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

// function capitalize(string: string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// export default function Actions() {
//   const [rows, setRows] = useState<Rows>([])

//   const columns = [
//     {label: "Id", key: "Id", sortable: true},
//     {label: "Date", key: "Date", sortable: true},
//     {label: "Reported", key: "Reported", sortable: true},
//     {label: "Assigned", key: "Assigned", sortable: true},
//     {label: "Item", key: "Item", sortable: true},
//     {label: "Status", key: "Status", sortable: true},    
//     {label: "Acuteness", key: "Acuteness", sortable: true}
//   ];

//   const loadData = async () => {
//     const actionsData: Actions = await getActions()

//     setRows(actionsData)
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   const statusOptions = [
//     { key: "Active", label: "active" },
//     { key: "Paused", label: "paused" },
//     { key: "Vacation", label: "vacation" },
//   ]

//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
//   const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
//   const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: "age",
//     direction: "ascending",
//   });
//   const [page, setPage] = React.useState(1);

//   const pages = Math.ceil(rows.length / rowsPerPage);

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;

//     return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
//   }, [visibleColumns, columns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredUsers = [...rows];

//     if (hasSearchFilter) {
//       filteredUsers = filteredUsers.filter((user) =>
//         user.name.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }
//     if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
//       filteredUsers = filteredUsers.filter((user) =>
//         Array.from(statusFilter).includes(user.status),
//       );
//     }

//     return filteredUsers;
//   }, [rows, filterValue, statusFilter, hasSearchFilter, statusOptions.length]);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a: RowData, b: RowData) => {
//       const first = a[sortDescriptor.column as keyof RowData] as number;
//       const second = b[sortDescriptor.column as keyof RowData] as number;
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const renderCell = React.useCallback((row: RowData, columnKey: React.Key) => {
//     const cellValue = row[columnKey as keyof RowData];

//     switch (columnKey) {
//       case "Reported":
//         return (
//           <User
//             avatarProps={{ radius: "full", size: "sm", src: row }}
//             classNames={{
//               description: "text-default-500",
//             }}
//             description={row.email}
//             name={cellValue}
//           >
//             {row.email}
//           </User>
//         );
//         case "Assigned":
//           return (
//             <User
//               avatarProps={{ radius: "full", size: "sm" }}
//               classNames={{
//                 description: "text-default-500",
//               }}
//               description={row.email}
//               name={cellValue}
//             >
//               {row.email}
//             </User>
//           );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-small capitalize">{cellValue}</p>
//             <p className="text-bold text-tiny capitalize text-default-500">{row.team}</p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip
//             className="capitalize border-none gap-1 text-default-600"
//             color={statusColorMap[row.status]}
//             size="sm"
//             variant="dot"
//           >
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex justify-end items-center gap-2">
//             <Dropdown className="bg-background border-1 border-default-200">
//               <DropdownTrigger>
//                 <Button isIconOnly radius="full" size="sm" variant="light">
//                   <Icon icon={DotsVerticalIcon} className="text-default-400" />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu>
//                 <DropdownItem>View</DropdownItem>
//                 <DropdownItem>Edit</DropdownItem>
//                 <DropdownItem>Delete</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);


//   const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(1);
//   }, []);

//   const onSearchChange = React.useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             classNames={{
//               base: "w-full sm:max-w-[44%]",
//               inputWrapper: "border-1",
//             }}
//             placeholder="Search by name..."
//             size="sm"
//             startContent={<Icon icon={SearchIcon} className="text-default-300" />}
//             value={filterValue}
//             variant="bordered"
//             onClear={() => setFilterValue("")}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<Icon icon={ChevronDownIcon} className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {statusOptions.map((status) => (
//                   <DropdownItem key={status.key} className="capitalize">
//                     {capitalize(status.label)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem key={column.key} className="capitalize">
//                     {capitalize(column.label)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               className="bg-foreground text-background"
//               endContent={<Icon icon={PlusIcon} />}
//               size="sm"
//             >
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">Total {rows.length} users</span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [
//     filterValue,
//     columns,
//     statusOptions,
//     statusFilter,
//     visibleColumns,
//     onSearchChange,
//     onRowsPerPageChange,
//     rows.length,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <Pagination
//           showControls
//           classNames={{
//             cursor: "bg-foreground text-background",
//           }}
//           color="default"
//           isDisabled={hasSearchFilter}
//           page={page}
//           total={pages}
//           variant="light"
//           onChange={setPage}
//         />
//         <span className="text-small text-default-400">
//           {selectedKeys === "all"
//             ? "All items selected"
//             : `${selectedKeys.size} of ${items.length} selected`}
//         </span>
//       </div>
//     );
//   }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

//   const classNames = React.useMemo(
//     () => ({
//       wrapper: ["max-h-[382px]", "max-w-3xl"],
//       th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
//       td: [
//         // changing the rows border radius
//         // first
//         "group-data-[first=true]:first:before:rounded-none",
//         "group-data-[first=true]:last:before:rounded-none",
//         // middle
//         "group-data-[middle=true]:before:rounded-none",
//         // last
//         "group-data-[last=true]:first:before:rounded-none",
//         "group-data-[last=true]:last:before:rounded-none",
//       ],
//     }),
//     [],
//   );

//   return (
//     <Table
//       isCompact
//       removeWrapper
//       aria-label="Example table with custom cells, pagination and sorting"
//       bottomContent={bottomContent}
//       bottomContentPlacement="outside"
//       checkboxesProps={{
//         classNames: {
//           wrapper: "after:bg-foreground after:text-background text-background",
//         },
//       }}
//       classNames={classNames}
//       selectedKeys={selectedKeys}
//       selectionMode="multiple"
//       sortDescriptor={sortDescriptor}
//       topContent={topContent}
//       topContentPlacement="outside"
//       onSelectionChange={setSelectedKeys}
//       onSortChange={setSortDescriptor}
//     >
//       <TableHeader columns={headerColumns}>
//         {(column) => (
//           <TableColumn
//             key={column.key}
//           >
//             {column.label}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody emptyContent={"No users found"} items={sortedItems}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
