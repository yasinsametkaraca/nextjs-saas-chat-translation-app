import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import ChatInput from "@/components/chat/ChatInput";
import {sortedMessagesRef} from "@/lib/converters/Message";
import {getDocs} from "@firebase/firestore";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatMembersBadges from '@/components/chat/ChatMembersBadges';
import AdminControls from "@/components/chat/AdminControls";

type Props = {  // parameters of the chat page. It is used to get the chatId. Next.js uses this to get the chatId. Url is used to get the chatId.
    params: {
        chatId: string;
    };
};

async function ChatPage({ params: {chatId} }: Props) {
    const session = await getServerSession(authOptions) // getServerSession is used to get the server session.

    // get the list of messages of the chat. It is used to get the initial messages of the chat.
    const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
            (doc) => doc.data()
        )



    return (
        <>
            <AdminControls chatId={chatId} />
            <ChatMembersBadges chatId={chatId} />
            <div className="flex-1">
                <ChatMessages chatId={chatId} session={session} initialMessages={initialMessages}/>
            </div>
            <ChatInput chatId={chatId}/>
        </>
    );
}

export default ChatPage;