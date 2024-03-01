"use client"

import {useSession} from "next-auth/react";

function ChatInput({chatId}: { chatId: string }) {
    const {data:session} = useSession();
    return (
        <div></div>
    );
}

export default ChatInput;