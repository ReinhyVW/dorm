"use client"

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

interface OptionCellProps {
  id: string;
}

type ButtonColor = "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined;

export default function OptionCell({ id }: OptionCellProps) {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [selectedChildren, setSelectedChildren] = useState<string>("Yes");
  const [color, setColor] = useState<ButtonColor>('success');

  useEffect(() => {
    localStorage.setItem(id, String(selectedOption));
  }, [id, selectedOption])

  function clickHandler(e: any) {
    if (selectedOption === 1) {
      setSelectedOption(0);
      setSelectedChildren("No");
      setColor('danger');
      localStorage.setItem(e.target.id, String(selectedOption));
    } else {
      setSelectedOption(1);
      setSelectedChildren("Yes");
      setColor('success');
      localStorage.setItem(e.target.id, String(selectedOption));
    }
  }

  return (
    <Button
      type="button"
      onPress={clickHandler}
      color={color}
      variant="flat"
      id={id}
      className="w-2/3"
    >
      {selectedChildren}
    </Button>
  );
}
