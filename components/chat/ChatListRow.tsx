"use client"

import { Skeleton } from "@/components/ui/skeleton"; // skeleton component is used to show the loading state of the chat list.
import {limitedSortedMessagesRef, Message} from "@/lib/converters/Message";
import {useCollectionData} from "react-firebase-hooks/firestore";
import UserAvatar from "@/components/user/UserAvatar";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useLanguageStore} from "@/store/store";

function ChatListRow({chatId}: {chatId: string}) {
    const {data: session} = useSession();
    const language = useLanguageStore((state) => state.language);
    const router = useRouter();
    const [messages, loading, error] = useCollectionData<Message>(
        limitedSortedMessagesRef(chatId)  // last message of the chat. to show in the chat list.
    );

    function prettyUUID(n = 4) {
        return chatId.substring(0, n) // prettyUUID is a function that returns the first n characters of the chatId.
    }

    const row = (message?: Message) => ( // row is a function that returns a chat list row.
        <div
            key={chatId}
            onClick={() => router.push(`/chat/${chatId}`)}
            className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
        >
            <UserAvatar
                name={message?.user.name || session?.user.name}
                image={message?.user.image || session?.user.image}
            />
            <div className="flex-1">
                <p className="font-bold">
                    {!message && "New Chat"}
                    {message && [message?.user.name || session?.user.name].toString().split(" ")[0]}
                </p>
                <p className="text-gray-400 line-clamp-1">
                    {message?.translated?.[language] || "Get the conversation started!"}
                </p>
            </div>
            <div className="text-xs text-gray-400 text-right">
                <p className="mb-auto">
                    {
                        message ? new Date(message?.timestamp).toLocaleTimeString() : "No messages yet"
                    }
                </p>
                <p className="">chat #{prettyUUID()}</p>
            </div>
        </div>
    )

    return (
        <div>
            {
                loading && (
                    <div className="flex p-5 items-center space-x-2">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                )
            }
            {
                messages?.length === 0 && !loading && row()
            }
            {
                messages?.map((message) => row(message))
            }
        </div>
    );
}

export default ChatListRow;