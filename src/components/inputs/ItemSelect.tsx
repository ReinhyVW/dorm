"use client"

import React, { useEffect } from "react";
import { Items } from "@/types";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getItems } from "@/adapters/dataGetters/getItems";

interface CenterSelectProps {
  selectedItem: string;
  id: string;
}

const ItemSelect: React.FC<CenterSelectProps> = ({ selectedItem: selectedItem, id }) => {
  const [value, setValue] = React.useState<Selection>(new Set<string>());
  const [itemData, setItemData] = React.useState<Items[]>([]);

  useEffect(() => {
    localStorage.setItem(id, String(Array.from(value)[0]));
  }, [value, id]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const itemData = await getItems();
        setItemData(itemData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    loadStatusData();
  }, []);

  return (
    <div className="p-1 flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Action Status"
        variant="flat"
        id={id}
        placeholder="Please select a status"
        defaultSelectedKeys={selectedItem}
        className="w-full"
        onSelectionChange={setValue}
      >
        {itemData?.map((item) => (
          <SelectItem key={item.ItemId} value={item.ItemId}>
            {item.Item}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ItemSelect;
