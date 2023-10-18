"use client"

import { Avatar } from "@nextui-org/react";

export default function UserBanner(
  { avatarSrc, userName, descriptionInfo }:
    { avatarSrc: string; userName: string | undefined; descriptionInfo: string }
) {
  return (
    <div className="flex items-center gap-3">
      <Avatar showFallback src={avatarSrc} name={userName} />
      <div className="flex flex-col justify-evenly">
        <p className="text-base">{userName}</p>
        <p className="text-small text-default-500">
          {descriptionInfo}
        </p>
      </div>
    </div>
  );
}
