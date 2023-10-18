"use client"

import React, { useEffect } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getStatus } from "@/adapters/dataGetters/getStatus";

interface StatusData {
  StatusId: number;
  Status: string;
}

interface StatusSelectProps {
  selectedStatus: string;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ selectedStatus }) => {
  const [value, setValue] = React.useState<Selection>(new Set<string>());
  // const [currentStatus, setCurrentStatus] = React.useState<string>("")
  const [statusData, setStatusData] = React.useState<StatusData[]>([]);

  function getStatusById(statusId: number) {
    return statusData?.find((status) => status.StatusId === statusId);
  }

  useEffect(() => {
    localStorage.setItem("selectedStatus", String(Array.from(value)[0]));
  }, [value]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const statusData = await getStatus();
        setStatusData(statusData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    localStorage.setItem("selectedStatus", selectedStatus);

    loadStatusData();
  }, [selectedStatus]);

  return (
    <div className="p-1 flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Action Status"
        variant="bordered"
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
      Current Status: {getStatusById(Number(selectedStatus))?.Status}
    </div>
  );
};

export default StatusSelect;
