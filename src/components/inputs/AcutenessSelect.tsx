"use client"

import React, { useEffect } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { Acuteness } from "@/types";
import { getAcuteness } from "@/adapters/dataGetters/getAcuteness";

interface CenterSelectProps {
  selectedCenter: string;
  id: string;
}

const AcutenessSelect: React.FC<CenterSelectProps> = ({ selectedCenter, id }) => {
  const [selectedAcuteness, setSelectedAcuteness] = React.useState<Selection>(new Set([]));
  const [acuteness, setAcuteness] = React.useState<Acuteness[]>([])

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(Array.from(selectedAcuteness)));
  }, [selectedAcuteness, id])

  useEffect(() => {
    const loadData = async () => {
      const acuteness = await getAcuteness()

      setAcuteness(acuteness)
    }

    loadData()
  }, [])

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
      {(acuteness) => <SelectItem value={acuteness.AcutenessId} key={acuteness.AcutenessId}>{acuteness.Acuteness}</SelectItem>}
    </Select>
  )
}

export default AcutenessSelect;
