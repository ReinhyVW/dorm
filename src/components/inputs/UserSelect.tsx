import React, { useEffect, useState } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { getUsers } from "@/adapters/dataGetters/getUsers";
import { Users } from "@/types";

interface UserSelectProps {
  selectedUser: string;
  id: string;
}

const UserSelect: React.FC<UserSelectProps> = ({ selectedUser, id }) => {
  const [value, setValue] = useState<Selection>(new Set<string>());
  const [userData, setUserData] = useState<Users[]>([]);

  useEffect(() => {
    localStorage.setItem(id, String(Array.from(value)[0]));
  }, [value, id]);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("loggedUserId") || "";
    localStorage.setItem(id, loggedUserId);
  }, [id]);

  useEffect(() => {
    const loadStatusData = async () => {
      try {
        const statusData = await getUsers();
        setUserData(statusData);
      } catch (err) {
        console.error("An error occurred while loading status data");
      }
    };

    loadStatusData();
  }, []);

  return (
    <div className="p-1 flex w-full max-w-xl flex-col gap-2">
      <Select
        label="Users"
        variant="flat"
        id={id}
        placeholder="Please select a user"
        defaultSelectedKeys={[selectedUser]}
        className="w-full min-w-[150px]"
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
