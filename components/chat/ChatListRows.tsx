"use client"

import React from 'react';
import {ChatMembers, chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";
import {useSession} from "next-auth/react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {MessageSquare} from "lucide-react";
import CreateChatButton from "@/components/header/CreateChatButton";
import ChatListRow from "@/components/chat/ChatListRow";

// initialChats is server side rendered data. It is used to render the initial data on the client side.
function ChatListRows({ initialChats }: { initialChats: ChatMembers[] } ) {
    const {data: session} = useSession();

    // useCollectionData is a hook that listens to the collection data in real-time. It returns an array of the collection data, a boolean value that indicates whether the data is loading, and an error object.
    const [members, loading, error] = useCollectionData<ChatMembers>(
        session && chatMembersCollectionGroupRef(session?.user.id!), {
            initialValue: initialChats,
        }
    ) // initialValue is used to set the initial value of the collection data. It is used to render the initial data on the client side. It is used to avoid the flickering of the data.

    if (members?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center pt-40 space-y-2">
                <MessageSquare className="w-10 h-10"/>
                <h1 className="text-5xl pb-7 pt-2 font-extralight">Welcome.</h1>
                <h2 className="text-2xl font-light">You do not have any chats yet.</h2>
                <h2 className="pb-7 text-2xl font-light">Lets get you started by creating your first chat!</h2>
                <CreateChatButton isLarge/>
            </div>
        )
    }
    return (
        <div className="">
            {members?.map((member, index) => (
                <ChatListRow key={member.chatId} chatId={member.chatId} />
            ))}
        </div>
    );
}

export default ChatListRows;