import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { PlusIcon } from "@heroicons/react/outline";
import UserSelect from "@/components/inputs/UserSelect";
import StatusSelect from "@/components/inputs/StatusSelect";
import CenterSelect from "@/components/inputs/CenterSelect";
import AcutenessSelect from "@/components/inputs/AcutenessSelect";
import ItemSelect from "@/components/inputs/ItemSelect";
import submitAction from "@/adapters/dataPosters/submitAction";

export default function ActionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignedBy, setAssignedBy] = React.useState<any>("");
  const [actionDescription, setActionDescription] = React.useState<any>("");

  React.useEffect(() => {
    const selectedUser: string | null = localStorage.getItem("loggedUserId")
    setAssignedBy(selectedUser)
  }, [setAssignedBy])

  React.useEffect(() => {
    const action: string | null = localStorage.getItem("actionDescription-action")
    setActionDescription(action)
  }, [])

  React.useEffect(() => {
    localStorage.setItem("actionDescription-action", actionDescription)
  }, [actionDescription])

  const clearClose = () => {
    for (let key in localStorage) {
      if (key.endsWith("-action") || key.endsWith("-action")) {
        localStorage.removeItem(key);
      }
    }
    setActionDescription("")

    onClose()
  }

  const submitClose = () => {
    const ReportedBy = localStorage.getItem("reportedBy-action")
    const AssignedTo = localStorage.getItem("assignedTo-action")
    const StatusId = localStorage.getItem("statusId-action")
    const CenterId = localStorage.getItem("centerId-action")
    const ActionDescription = localStorage.getItem("actionDescription-action")
    const Acuteness = localStorage.getItem("acuteness-action")
    const ItemId = localStorage.getItem("itemId-action")

    const data = { ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId }

    submitAction(data)
    // clearClose()
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="flat"
          onPress={onOpen}
          size="sm"
          className="capitalize bg-black text-white"
          startContent={<Icon icon={PlusIcon} className="text-white" />}
        >Add New
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Action</ModalHeader>
              <ModalBody>
                <UserSelect selectedUser={assignedBy} id="reportedBy-action" />
                <UserSelect selectedUser={""} id="assignedTo-action" />
                <StatusSelect selectedStatus="1" id="statusId-action" showStatus={false} />
                <CenterSelect selectedCenter="" id="centerId-action" />
                <Textarea label="Action Description" id="actionDescription-action" value={actionDescription} onValueChange={setActionDescription} />
                <AcutenessSelect defaultAcuteness="1" id="acuteness-action" />
                <ItemSelect selectedItem="" id="itemId-action" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={clearClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={submitClose}>
                  Create Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
