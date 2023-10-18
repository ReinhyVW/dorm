"use client"

import { Users } from "@/types";

import React, { useEffect } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getUsers } from "@/adapters/dataGetters/getUsers";

interface CenterSelectProps {
  selectedCenter: string;
  id: string;
}

const UserSelect: React.FC<CenterSelectProps> = ({ selectedCenter: selectedUser, id }) => {
  const [value, setValue] = React.useState<Selection>(new Set<string>());
  const [userData, setUserData] = React.useState<Users[]>([]);

  useEffect(() => {
    localStorage.setItem("selectedUser", String(Array.from(value)[0]));
  }, [value]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const statusData = await getUsers();
        setUserData(statusData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    localStorage.setItem("selectedStatus", selectedUser);

    loadStatusData();
  }, [selectedUser]);

  return (
    <div className="p-1 flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Users"
        variant="flat"
        id={id}
        placeholder="Please select a user"
        defaultSelectedKeys={selectedUser}
        className="w-full"
        onSelectionChange={setValue}
      >
        {userData?.map((user) => (
          <SelectItem key={user.UserId} value={user.UserId}>
            {user.Username}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default UserSelect;
