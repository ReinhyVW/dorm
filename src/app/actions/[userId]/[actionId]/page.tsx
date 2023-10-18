"use client"

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Textarea,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import CommentInput from "../../components/CommentInput";
import { getAction } from "@/adapters/dataGetters/getActions";
import { getComments } from "@/adapters/dataGetters/getComments";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import StatusSelect from "@/components/inputs/StatusSelect";
import UserBanner from "@/components/UserBanner";
import Comment from "../../components/Comment";

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

interface CommentsData {
  CommentId: number;
  CommentAction: number | null;
  CommentedBy: number | null;
  CommentDate: Date;
  CommentContent: null | string;
}

export default function Action({ params }: ActionProps) {
  const [actionData, setActionData] = useState<ActionData | null>(null);
  const [statusId, setStatusId] = useState<string>("");
  const [comments, setComments] = useState<CommentsData[] | null>(null); // Fix comments type

  const actionId = params.actionId;
  const userId = params.userId;

  useEffect(() => {
    const loadData = async () => {
      try {
        const action = await getAction(actionId);
        const comments = await getComments(actionId);

        setActionData(action);
        setComments(comments);
        setStatusId(String(actionData?.StatusId))
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [actionId, actionData]);

  useEffect(() => {
    localStorage.setItem("userId", params.userId);
    localStorage.setItem("actionId", params.actionId);
  }, [params.userId, params.actionId]);

  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
      <Card className="min-w-fit h-5/6">
        <CardHeader className="flex gap-3 min-w-max">
          <UserBanner avatarSrc="" userName={actionData?.AssignedTo} descriptionInfo={`
            Action # ${actionId}
          `} />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3 w-full justify-evenly">
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

          <StatusSelect selectedStatus={statusId} />

          <Textarea
            label="Issue Description"
            readOnly={true}
            defaultValue={actionData?.ActionDescription || ""}
          />

          <CommentInput title="Comment" id="comment" item="New" />
        </CardBody>
        <Divider />
        <CardFooter className="justify-evenly">
          <Button
            color="danger"
            variant="flat"
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              router.refresh();
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>

      <Card className="h-5/6 w-1/3 flex flex-col items-center pt-4 gap-1">
        <ScrollShadow hideScrollBar className="w-full min-h-full flex flex-wrap items-start justify-center gap-2">
          {comments?.map((comment) => (
            <Comment
              key={comment.CommentId}
              avatarSrc=""
              commentContent={comment.CommentContent || ""}
              descriptionInfo={String(new Date(comment.CommentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }))}
              userName={`User ${comment.CommentedBy}`}
            />
          ))}
        </ScrollShadow>
      </Card>

    </div >
  );
}
