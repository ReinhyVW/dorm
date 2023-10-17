"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

import submitComment from "@/adapters/dataPosters/submitComment";

export default function ActionText({
  title,
  id,
  item,
}: {
  title: string;
  id: string;
  item: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const createComment = () => {
    const commentContent = localStorage.getItem('new-comment');
    const UserId = localStorage.getItem('userId')
    const ActionId = localStorage.getItem('actionId')

    const data = { ActionId, UserId, commentContent }

    submitComment(data)
  }

  return (
    <>
      <Button
        id={id}
        onClick={() => {
          onOpen();
        }}
        color={"warning"}
        variant="flat"
      >{`Add a ${title}`}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1`}>{`${item} ${title}`}</ModalHeader>
              <ModalBody>
                <Textarea
                  id="new-comment"
                  defaultValue={localStorage.getItem("new-comment") || ""}
                  color={"default"}
                  onChange={(e) => {
                    localStorage.setItem("new-comment", e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={async () => {
                    await localStorage.removeItem(id);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color={"success"}
                  onClick={() => {
                    createComment()
                    router.refresh();
                    onClose();
                  }}
                >
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