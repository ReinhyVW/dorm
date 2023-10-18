"use client"

import React, { useEffect } from "react";
import { Centers } from "@/types";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getCenters } from "@/adapters/dataGetters/getCenters";

interface CenterSelectProps {
  selectedCenter: string;
  id: string;
}

const CenterSelect: React.FC<CenterSelectProps> = ({ selectedCenter, id }) => {
  const [value, setValue] = React.useState<Selection>(new Set<string>());
  const [centerData, setCenterData] = React.useState<Centers[]>([]);

  useEffect(() => {
    localStorage.setItem("selectedCenter", String(Array.from(value)[0]));
  }, [value]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const statusData = await getCenters();
        setCenterData(statusData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    localStorage.setItem("selectedStatus", selectedCenter);

    loadStatusData();
  }, [selectedCenter]);

  return (
    <div className="p-1 flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Action Status"
        variant="flat"
        id={id}
        placeholder="Please select a status"
        defaultSelectedKeys={selectedCenter}
        className="w-full"
        onSelectionChange={setValue}
      >
        {centerData?.map((center) => (
          <SelectItem key={center.CenterId} value={center.CenterId}>
            {center.Center}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CenterSelect;
