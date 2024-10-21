import Link from "next/link";

import Image from "@/common/components/Image";
import { PostProps } from "@/common/types";

const PostCard = ({ id, userId, title, body }: PostProps) => {
  return (
    <Link href={`/${id}`}>
      <div className="p-5 border bg-white border-neutral-100 shadow-sm space-y-5 rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-md">
        <div className="flex gap-x-3 items-center pb-3 border-b border-neutral-100">
          <div className="p-1 bg-purple-50 rounded-full">
            <Image
              src="/images/user.jpeg"
              width={40}
              height={40}
              alt="user"
              rounded="rounded-full"
            />
          </div>
          <div className="space-y-1">
            <h5 className="font-medium">User. {userId}</h5>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 text-xs">{title}</div>
          <div className="flex gap-2 text-xs">{body}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
