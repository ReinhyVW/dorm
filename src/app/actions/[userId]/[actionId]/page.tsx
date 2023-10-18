"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardBody, CardFooter, Divider,
  Input, Textarea, Button,
  ScrollShadow
} from "@nextui-org/react";

import { getAction } from "@/adapters/dataGetters/getActions";
import { getComments } from "@/adapters/dataGetters/getComments";
import { updateAction } from "@/adapters/dataPutters/updateAction";

import StatusSelect from "@/components/inputs/StatusSelect";
import UserBanner from "@/components/UserBanner";
import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";

type ActionData = {
  AssignedOn: Date;
  ReportedBy: string;
  AssignedTo: string;
  Item: string;
  StatusId: number;
  ActionDescription: string;
  Center: string;
  Resolution: null | string;
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

type UpdateActionData = {
  StatusId: number,
  Resolution: string
}

export default function Action({ params }: ActionProps) {
  const [actionData, setActionData] = useState<ActionData | null>(null)
  const [statusId, setStatusId] = useState<string>("")
  const [comments, setComments] = useState<CommentsData[] | null>(null)
  const [resolution, setResolution] = useState<string>("")

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

  const saveActionGoHome = () => {
    try {
      const updateActionData: UpdateActionData = {
        StatusId: Number(localStorage.getItem("selectedStatus")),
        Resolution: resolution
      }

      updateAction(actionId, updateActionData)
    } catch (error) {
      console.error(error)
    } finally {
      router.push('/')
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-100 flex items-center justify-center gap-0.5">
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

          <Input
            className="w-full"
            classNames={{ label: "w-1/3" }}
            readOnly={true}
            labelPlacement="outside-left"
            label="Center"
            value={actionData?.Center || ""}
          />

          <StatusSelect selectedStatus={statusId} />

          <Textarea
            label="Issue Description"
            readOnly={true}
            defaultValue={actionData?.ActionDescription || ""}
          />

          <Textarea
            label="Resolution"
            readOnly={false}
            defaultValue={actionData?.Resolution || ""}
            onValueChange={setResolution}
            id="resolution"
          />

          <CommentInput title="Comment" id="comment" item="New" />
        </CardBody>
        <Divider />
        <CardFooter className="justify-evenly">
          <Button
            color="danger"
            variant="flat"
            onClick={() => {
              router.push("/")
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={saveActionGoHome}
          >
            Save
          </Button>
        </CardFooter>
      </Card>

      <Card className="h-5/6 w-1/3 flex flex-col py-4 items-center pt-4 gap-1">
        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          <h1 className="text-lg text-foreground-500 font-semibold">Comments</h1>
        </div>
        <ScrollShadow hideScrollBar className="w-full py-6 min-h-full flex flex-wrap items-start justify-center gap-2">
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
              userName={`${comment.CommentedBy}`}
            />
          ))}
        </ScrollShadow>
      </Card>

    </div >
  );
}
