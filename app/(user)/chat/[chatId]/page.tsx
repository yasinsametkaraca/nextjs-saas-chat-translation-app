import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import ChatInput from "@/components/chat/ChatInput";

async function ChatPage() {
    const session = await getServerSession(authOptions) // getServerSession is used to get the server session.

    return (
        <>
            <div className="h-screen">

            </div>
            <ChatInput chatId={"session"}/>
        </>
    );
}

export default ChatPage;