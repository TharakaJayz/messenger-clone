import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types/index";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
    console.log("data came in useOtherUser===>>>",conversation)
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
  
    return otherUser[0];
  }, [session?.data?.user?.email, conversation?.users]);

  return otherUser;
};

export default useOtherUser;

