import React from 'react';
import ChatList from "@/components/chat/ChatList";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

function ChatsPage({searchParams: {error} }: Props) {
    return (
        <div>
            <h1>Chats</h1>
            <ChatList />
        </div>
    );
}

export default ChatsPage;