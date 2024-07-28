'use client'
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "../ConversationBox";
import GroupChatModel from "./GroupChatModel";

interface ConversationListProps {
    intialItems: FullConversationType[];
    users:User[]
}
const ConversationList: React.FC<ConversationListProps> = ({ intialItems,users }) => {
    const [items, setItems] = useState(intialItems);
    const [isModelOpen,setIsModelOpen] = useState(false);
    const router = useRouter();

    const { conversationId, isOpen } = useConversation();
    return (
        <>
        <GroupChatModel 
        isOpen = {isModelOpen}
        users ={users}
        onClose = {()=>setIsModelOpen(false)}


        />
        <aside className={clsx(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`, isOpen ? 'hidden' : 'block w-full left-0')}>
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800">Messages</div>
                    <div className="rounded-full p-2 bg-gray-100 cursor-pointer hover:opacity-75 transition"><MdOutlineGroupAdd size={20}
                    onClick={()=>setIsModelOpen(true)}
                    /></div>
                </div>
                {items.map((item)=>(
                    <ConversationBox  
                    key = {item.id}
                    data = {item}
                    selected ={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>
        </>
    );
}

export default ConversationList;