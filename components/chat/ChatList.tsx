import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {getDocs} from "@firebase/firestore";
import {chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";
import ChatListRows from "@/components/chat/ChatListRows";

async function ChatList() {
    const session = await getServerSession(authOptions);

    const chatsSnapshot = await getDocs(  // server side rendering for chat list page. Get all the chats of the user.
            chatMembersCollectionGroupRef(session?.user.id!
        ));

    // initialChats is an array of chat members. It is used to get the list of chats of the user.
    const initialChats = chatsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            timestamp: null,
        }));

    return (
        <ChatListRows initialChats={initialChats} />
    );
}

export default ChatList;