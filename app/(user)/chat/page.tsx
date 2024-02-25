import React from 'react';
import ChatList from "@/components/chat/ChatList";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

function ChatsPage({searchParams: {error}}: Props) {
    return (
        <ChatList />
    );
}

export default ChatsPage;