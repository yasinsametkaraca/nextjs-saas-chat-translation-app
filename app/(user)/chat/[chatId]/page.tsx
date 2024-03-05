import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import ChatInput from "@/components/chat/ChatInput";

type Props = {  // parameters of the chat page. It is used to get the chatId. Next.js uses this to get the chatId. Url is used to get the chatId.
    params: {
        chatId: string;
    };
};

async function ChatPage({ params: {chatId} }: Props) {
    const session = await getServerSession(authOptions) // getServerSession is used to get the server session.

    return (
        <>
            <ChatInput chatId={chatId}/>
        </>
    );
}

export default ChatPage;