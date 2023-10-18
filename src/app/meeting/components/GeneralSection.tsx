"use client"

import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Corrected import
import { deleteMeetingData } from "../domain/manageMeetingData";
import saveRecord from "../adapters/saveRecord";

interface GeneralSectionProps {
  date: { date: string };
}

export default function GeneralSection({ date }: GeneralSectionProps) {
  const router = useRouter();

  const cancel = () => {
    deleteMeetingData();
    router.push('/');
  };

  const savedDate = new Date(date.date);

  const save = async () => {
    const meetingData: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(localStorage)) {
      if (key.endsWith("-meetingData")) {
        const newKey = key.replace("-meetingData", "");
        meetingData[newKey] = value;
      }
    }

    type GroupedData = { [key: string]: { [key: string]: string } };

    const groupedData: GroupedData = {};

    Object.keys(meetingData).forEach((key) => {
      const [firstChar, secondChar] = key.split("-");

      const newKey = secondChar;
      const secondKey = firstChar;

      if (groupedData[newKey]) {
        groupedData[newKey][secondKey] = meetingData[key];
      } else {
        groupedData[newKey] = { [secondKey]: meetingData[key] };
      }
    });

    const actionData: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(localStorage)) {
      if (key.endsWith("-action")) {
        const newKey = key.replace("-action", "");
        actionData[newKey] = value;
      }
    }

    const groupedActionData: { [key: string]: { [key: string]: string } } = {};

    Object.keys(actionData).forEach((key) => {
      const [firstChar, secondChar] = key.split("-");

      const newKey = firstChar;
      const secondKey = secondChar;

      if (groupedActionData[newKey]) {
        groupedActionData[newKey][secondKey] = actionData[key];
      } else {
        groupedActionData[newKey] = { [secondKey]: actionData[key] };
      }
    });

    const data = {
      date: savedDate,
      groupedData,
      groupedActionData,
    }

    await saveRecord(data);

    deleteMeetingData();
    // router.push('/');
  };

  return (
    <>
      <Textarea
        onChange={(e) => {
          localStorage.setItem('general-comment-meetingData', e.target.value);
        }}
        color="success"
        fullWidth
        classNames={{ mainWrapper: "w-5/6", label: "w-1/6 text-center font-bold text-lg text-success-500" }}
        label="General Comment"
        labelPlacement="inside"
        maxLength={280}
        id="gen-comment"
      />
      <Textarea
        onChange={(e) => {
          localStorage.setItem('general-announcement-meetingData', e.target.value);
        }}
        color="warning"
        fullWidth
        classNames={{ mainWrapper: "w-5/6", label: "w-1/6 text-center font-bold text-lg text-warning-500" }}
        label="Announcement"
        labelPlacement="inside"
        maxLength={280}
        id="announcement"
      />

      <div className="flex gap-8 h-14">
        <Button onClick={save} color="success" variant="shadow" className="w-32 h-14 text-2xl text-white">
          Save
        </Button>
        <Button onClick={cancel} color="danger" variant="shadow" className="w-32 h-14 text-2xl text-white">
          Cancel
        </Button>
      </div>
    </>
  );
}
