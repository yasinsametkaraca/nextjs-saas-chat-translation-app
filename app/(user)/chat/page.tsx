import React from 'react';
import ChatList from "@/components/chat/ChatList";
import ChatPermissionError from "@/components/chat/ChatPermissionError";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

// searchParams is used to read the current URL's query string.
// searchParams is used to get the error. It is used to get the error from the url. For example, if the user does not have access to the chat, it will show the error message. Url is /chat?error=permission.
function ChatsPage({searchParams: {error} }: Props) {

    return (
        <div>
            {
                error &&
                    <div className="m-2">
                        <ChatPermissionError />
                    </div>
            }
            <ChatList />
        </div>
    );
}

export default ChatsPage;