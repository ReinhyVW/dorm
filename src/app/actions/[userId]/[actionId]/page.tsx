"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from "@nextui-org/react";
import ActionText from "../../components/ActionText";
import { getAction } from "@/adapters/dataGetters/getActions";
import { getComments } from "@/adapters/dataGetters/getComments";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

type ActionData = {
  AssignedOn: Date;
  ReportedBy: string;
  AssignedTo: string;
  Item: string;
  StatusId: number;
  ActionDescription: string;
};

type ActionProps = {
  params: { actionId: string; userId: string };
};

export default function Action({ params }: ActionProps) {
  const [actionData, setActionData] = useState<ActionData | null>(null);
  const [status, setStatus] = useState<string>("");
  const [comments, setComments] = useState<string | undefined>();

  const actionId = params.actionId;
  const userId = params.userId;

  useEffect(() => {
    const loadData = async () => {
      const action = await getAction(actionId)
      const comments = await getComments(actionId)

      setActionData(action)
      setComments(comments)
    }

    loadData();
  }, [actionId]);

  useEffect(() => {
    localStorage.setItem("userId", params.userId);
    localStorage.setItem("actionId", params.actionId);
  }, [params.userId, params.actionId]);

  const animals = [
    { label: "Not Started", value: "1" },
    { label: "In Progress", value: "2" },
    { label: "On Hold", value: "3" },
    { label: "Awaiting Response", value: "4" },
    { label: "Closed", value: "5" },
  ];

  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <Card className="min-w-fit">
        <CardHeader className="flex gap-3 min-w-max">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/icon.png"
            width={40}
            as={NextImage}
          />
          <div className="flex flex-col">
            <p className="text-md">{actionData?.AssignedTo}</p>
            <p className="text-small text-default-500">
              Action # {actionId}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3 w-full">
          <Input
            className="w-full"
            classNames={{ label: "w-1/3" }}
            readOnly={true}
            labelPlacement="outside-left"
            label="Assigned On"
            value={
              actionData?.AssignedOn
                ? new Date(actionData.AssignedOn).toLocaleString()
                : ""
            }
          />
          <Input
            className="w-full"
            classNames={{ label: "w-1/3" }}
            readOnly={true}
            labelPlacement="outside-left"
            label="Reported By"
            value={actionData?.ReportedBy || ""}
          />
          <Input
            className="w-full"
            classNames={{ label: "w-1/3" }}
            readOnly={true}
            labelPlacement="outside-left"
            label="Issue Type"
            value={actionData?.Item || ""}
          />
          <Select
            label="Select a Status"
            className="w-full"
            defaultSelectedKeys={status || "1"}
            onChange={(value) => setStatus(value)}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Issue Description"
            readOnly
            defaultValue={actionData?.ActionDescription || ""}
          />

          

          <ActionText title="Comment" id="comment" item="New" />
        </CardBody>
        <Divider />
        <CardFooter className="justify-evenly">
          <Button
            color="danger"
            variant="flat"
            onClick={async () => {
              router.push("/");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              router.push("/home");
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
