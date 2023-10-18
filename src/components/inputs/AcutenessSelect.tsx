"use client"

import React, { useEffect } from "react";
import { Acuteness } from "@/types";
import { Select, SelectItem, Selection } from "@nextui-org/react";


interface CenterSelectProps {
  selectedCenter: string;
  id: string;
}

const AcutenessSelect: React.FC<CenterSelectProps> = ({ selectedCenter, id }) => {
  const [selectedAcuteness, setSelectedAcuteness] = React.useState<Selection>(new Set([]));

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(Array.from(selectedAcuteness)));
  }, [selectedAcuteness, id])

  const acuteness: Acuteness[] = [
    {
      acutenessId: 1,
      acutenessName: "Urgent"
    },
    {
      acutenessId: 2,
      acutenessName: "Normal"
    },
    {
      acutenessId: 3,
      acutenessName: "Non-Critical"
    }
  ]

  return (
    <Select
      items={acuteness}
      label="Acuteness"
      placeholder="Select an acuteness level"
      variant="flat"
      id={id}
      selectedKeys={selectedAcuteness}
      onSelectionChange={setSelectedAcuteness}
    >
      {(acuteness) => <SelectItem value={acuteness.acutenessId} key={acuteness.acutenessId}>{acuteness.acutenessName}</SelectItem>}
    </Select>
  )
}

export default AcutenessSelect;
