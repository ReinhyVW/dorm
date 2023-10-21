"use client"

import * as React from 'react';
import { CardHeader, Card, Divider, CardBody, Input, Textarea } from '@nextui-org/react';
import UserBanner from './UserBanner';

interface EmailTemplateProps {
  ActionId: number;
  AssignedOn: Date;
  ReportedBy: string;
  AssignedTo: string;
  Item: string;
  StatusId: number;
  ActionDescription: string;
  Acuteness: string;
  Center: string;
  Resolution: string | null;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  AssignedTo
}) => (
  <div className="w-screen h-screen bg-slate-100 flex items-center justify-center gap-0.5">
    <Card className="min-w-fit h-5/6">
      <CardHeader className="flex gap-3 min-w-max">
        <UserBanner avatarSrc="" userName={AssignedTo} descriptionInfo={`
        Action Assigned
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
          value={"1"}
        />
        <Input
          className="w-full"
          classNames={{ label: "w-1/3" }}
          readOnly={true}
          labelPlacement="outside-left"
          label="Reported By"
          value={"1"}
        />
        <Input
          className="w-full"
          classNames={{ label: "w-1/3" }}
          readOnly={true}
          labelPlacement="outside-left"
          label="Issue Type"
          value={""}
        />

        <Input
          className="w-full"
          classNames={{ label: "w-1/3" }}
          readOnly={true}
          labelPlacement="outside-left"
          label="Center"
          value={""}
        />
        <Textarea
          label="Issue Description"
          readOnly={true}
          defaultValue={""}
        />
      </CardBody>
    </Card>
  </div>
)
