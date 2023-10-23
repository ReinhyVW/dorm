"use client"

import React, { useEffect } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getStatus } from "@/adapters/dataGetters/getStatus";
import { Status } from "@/types";

interface StatusSelectProps {
  selectedStatus: string;
  id: string;
  showStatus: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ selectedStatus, id, showStatus }) => {
  const [value, setValue] = React.useState<Selection>(new Set<string>());
  const [statusData, setStatusData] = React.useState<Status[]>([]);

  function getStatusById(statusId: number) {
    return statusData?.find((status) => status.StatusId === statusId);
  }

  useEffect(() => {
    localStorage.setItem(id, String(Array.from(value)[0]));
  }, [value, id]);

  useEffect(() => {
    localStorage.setItem(id, selectedStatus);
  }, [selectedStatus, id]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const statusData = await getStatus();
        setStatusData(statusData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    loadStatusData();
  }, [selectedStatus]);

  return (
    <div className="p-1 flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Action Status"
        variant="flat"
        placeholder="Please select a status"
        defaultSelectedKeys={selectedStatus}
        className="w-full"
        onSelectionChange={setValue}
      >
        {statusData?.map((status) => (
          <SelectItem key={status.StatusId} value={status.StatusId}>
            {status.Status}
          </SelectItem>
        ))}
      </Select>
      <p className={`${showStatus ? "flex" : "hidden"}`}>Current Status: {getStatusById(Number(selectedStatus))?.Status}</p>
      <span className="hidden"></span>
    </div>
  );
};

export default StatusSelect;
