"use client"

import {
  Button,
  Modal, ModalHeader, ModalContent, ModalBody, ModalFooter,
  Textarea,
  useDisclosure
} from '@nextui-org/react';

export default function TableText({ title, id, item }: { title: string; id: string; item: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  type Color = {
    Comment: string | undefined,
    Description: string | undefined,
  };

  const colorMap: Color = {
    Comment: "primary",
    Description: "secondary"
  };

  const color: "primary" | "secondary" | "default" | "success" | "warning" | "danger" =
    (colorMap[title as keyof Color] || "default") as "primary" | "secondary" | "default" | "success" | "warning" | "danger";

  return (
    <>
      <Button
        id={id}
        onClick={() => {  // Corrected from onPress to onClick
          onOpen();
        }}
        color={color}
        variant='flat'
      >{`Add a ${title}`}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1`}>{`${item} ${title}`}</ModalHeader>
              <ModalBody>
                <Textarea id={id} defaultValue={localStorage.getItem(id) || ""} color={color} onChange={(e) => { localStorage.setItem(id, e.target.value) }} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={async () => { await localStorage.removeItem(id); onClose(); }}>
                  Cancel
                </Button>
                <Button color={color} onClick={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
