import { Card, Divider } from "@nextui-org/react";
import UserBanner from "@/components/UserBanner";

interface CommentProps {
  avatarSrc: string;
  userName: string;
  descriptionInfo: string;
  commentContent: string;
}

const Comment: React.FC<CommentProps> = ({
  avatarSrc,
  userName,
  descriptionInfo,
  commentContent,
}) => {
  return (
    <Card className="w-11/12 h-max flex p-4">
      <UserBanner
        avatarSrc={avatarSrc}
        userName={userName}
        descriptionInfo={descriptionInfo}
      />
      <Divider className="w-full" />
      <p className="p-4">{commentContent}</p>
    </Card>
  );
};

export default Comment;
