"use client"

import React from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Input, Button,
  DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Selection,
  User,
  Chip, ChipProps,
  SortDescriptor
} from "@nextui-org/react";

import { Icon } from "@tremor/react";
import { DotsVerticalIcon, ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";

import { capitalize } from "../../domain/capitalize";

import { Actions, Acuteness, Status } from "@/types";

import { getActions } from "@/adapters/dataGetters/getActions";
import { getAcuteness } from "@/adapters/dataGetters/getAcuteness";
import { getStatus } from "@/adapters/dataGetters/getStatus";

import { columns } from "../../domain/columns"

import Loading from "@/components/Loading";
import ActionModal from "../action/ActionModal";
import { useRouter } from "next/navigation";

const acutenessColorMap: Record<string, ChipProps["color"]> = {
  1: "danger",
  2: "warning",
  3: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["ActionId", "AssignedOn", "ReportedBy", "AssignedTo", "Acuteness", "Status", "Center", "Actions"];

export default function ActionTable() {
  const [acuteness, setAcuteness] = React.useState<Acuteness[]>([])
  const [status, setStatus] = React.useState<Status[]>([])
  const [actions, setActions] = React.useState<Actions[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [acutenessFilter, setAcutenessFilter] = React.useState<Selection>("all");
  const [statusFilter, setStatusFilter] = React.useState<Selection>(new Set([
    "1",
    "2",
    "3"
  ]));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "AssignedOn",
    direction: "descending",
  });
  const [page, setPage] = React.useState(1);

  const router = useRouter()

  const pages = Math.ceil(actions.length / rowsPerPage);

  React.useEffect(() => {
    async function loadData() {
      const rows: Actions[] = await getActions()
      setActions(rows)

      const acuteness = await getAcuteness()
      setAcuteness(acuteness)

      const status = await getStatus()
      setStatus(status)
    }

    loadData()
  }, [])

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredActions: Actions[] = [...actions];

    if (hasSearchFilter) {
      const searchFilter = filterValue.toLowerCase();
      filteredActions = filteredActions.filter((action) =>
        action.AssignedTo.toLowerCase().includes(searchFilter)
      );
    }

    if (acutenessFilter !== "all" && acutenessFilter.size > 0) {
      const acutenessArray = Array.from(acutenessFilter);
      filteredActions = filteredActions.filter((action) =>
        acutenessArray.includes(action.Acuteness)
      );
    }

    if (statusFilter !== "all" && statusFilter.size > 0) {
      const statusArray = Array.from(statusFilter);
      filteredActions = filteredActions.filter((action) =>
        statusArray.includes(String(action.StatusId))
      );
    }

    return filteredActions;
  }, [actions, filterValue, acutenessFilter, hasSearchFilter, statusFilter]);



  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Actions, b: Actions) => {
      const first = a[sortDescriptor.column as keyof Actions] as number;
      const second = b[sortDescriptor.column as keyof Actions] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const sendReminderEmail = () => {
    // { ActionId, AssignedOn, ReportedByUserId, ReportedBy, ReportedByEmail, AssignedToUserId, AssignedTo, AssignedToEmail, Item, Status, ActionDescription, Acuteness, Center }
    // const ActionId = action.ActionId
    // const AssignedOn = action.AssignedOn
    // const ReportedByUserId= action.

    // const data = {  }
    // submitEmail(action.A)

    alert("Soon to be implemented")
  }

  const renderCell = React.useCallback((action: Actions, columnKey: React.Key) => {
    const cellValue = action[columnKey as keyof Actions];

    switch (columnKey) {
      case "ActionId":
        return <>{String(action.ActionId)}</>
      case "AssignedOn":
        return <>{String(action.AssignedOn)}</>
      case "ReportedBy":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F6658339%2Finstagram_profile_user_icon&psig=AOvVaw1zWRuf9KUnozmI3N-ySVoB&ust=1697915659504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPikxPCqhYIDFQAAAAAdAAAAABAE" }}
            classNames={{
              description: "text-default-500",
            }}
            description={String(action.ReportedByEmail)}
            name={String(action.ReportedBy)}
          >
            {String(action.ReportedByEmail)}
          </User>
        );
      case "AssignedTo":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F6658339%2Finstagram_profile_user_icon&psig=AOvVaw1zWRuf9KUnozmI3N-ySVoB&ust=1697915659504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPikxPCqhYIDFQAAAAAdAAAAABAE" }}
            classNames={{
              description: "text-default-500",
            }}
            description={String(action.AssignedToEmail)}
            name={String(action.AssignedTo)}
          >
            <>{String(action.AssignedToEmail)}</>
          </User>
        );
      case "Item":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-medium capitalize">{String(action.Item)}</p>
          </div>
        );
      case "Status":
        return <p>{String(action.Status)}</p>;
      case "Center":
        return <p>{String(action.Center)}</p>
      case "Acuteness":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={acutenessColorMap[action.Acuteness]}
            size="sm"
            variant="dot"
          >
            {String(action.Acuteness)}
          </Chip>
        );
      case "Actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon icon={DotsVerticalIcon} className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => {
                  router.push(`/actions/${localStorage.getItem("loggedUserId")
                    }/${action.ActionId}`)
                }}>View Action</DropdownItem>
                <DropdownItem onClick={sendReminderEmail}>Send Reminder</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue;
    }
  }, [router]);


  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<Icon icon={SearchIcon} color="neutral" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon={ChevronDownIcon} color="neutral" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {status.map((status) => (
                  <DropdownItem key={status.StatusId} className="capitalize">
                    {capitalize(status.Status)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon={ChevronDownIcon} color="neutral" />}
                  size="sm"
                  variant="flat"
                >
                  Acuteness
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={acutenessFilter}
                selectionMode="multiple"
                onSelectionChange={setAcutenessFilter}
              >
                {acuteness.map((acuteness) => (
                  <DropdownItem key={acuteness.AcutenessId} className="capitalize">
                    {capitalize(acuteness.Acuteness)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon={ChevronDownIcon} color="neutral" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <ActionModal />

          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {actions.length} Actions</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    acutenessFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    actions.length,
    acuteness,
    rowsPerPage,
    status,
    statusFilter
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <>
      <Table
        isCompact
        className="w-full h-full z-40"
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={<Loading />} items={sortedItems}>
          {(item: any) => (
            <TableRow key={item.ActionId}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
