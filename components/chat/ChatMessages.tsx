"use client"

import {Message, messagesRef, sortedMessagesRef} from "@/lib/converters/Message";
import {Session} from "next-auth";
import {useLanguageStore} from "@/store/store";
import {createRef, useEffect} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { MessageCircleIcon } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserAvatar from "@/components/user/UserAvatar";

function ChatMessages({ chatId, initialMessages, session }: { chatId: string, initialMessages: Message[], session: Session | null }) {
    const language = useLanguageStore(state => state.language);
    const messagesEndRef = createRef<HTMLDivElement>()  // create a reference to the last message of the chat. It is used to scroll to the last message of the chat.

    // get the list of messages of the chat. It is used to get the list of messages of the chat. UseCollectionData is used to get the list of messages of the chat. Listen to the list of messages of the chat.
    const [messages, loading, error] = useCollectionData<Message>(
        sortedMessagesRef(chatId), {
            initialValue: initialMessages,
        }
    ) // listens for changes in messages and updates them. It listens for changes before the page is refreshed. Real time listener.

    useEffect(() => {  // If any message is added to the chat, it will scroll to the last message of the chat.
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })  // scroll to the last message of the chat. It is used to scroll to the last message of the chat. scrollIntoView is used to scroll to the last message of the chat.
    }, [messages, messagesEndRef])

    return (
        <div className="p-5">
            {
                !loading && messages?.length === 0 && (
                    <div className="flex flex-col justify-center items-center text-center p-16 rounded-2xl space-y-2.5 bg-indigo-500 text-white font-extralight">
                        <MessageCircleIcon className="w-10 h-10" />
                        <h2>
                            <span className="font-bold">Invite a friend </span>&{" "}
                            <span className="font-bold">Send your first messages in any language</span>{" "}below to get started
                        </h2>
                        <p>The artificial intelligence will auto detect and translate it all</p>
                    </div>
                )
            }
            {messages?.map((message) => {
                const isSender = message.user.id === session?.user?.id;  // check if the message is sent by the user. It is used to check if the message is sent by the user.
                return (
                    <div key={message.id} className="flex my-2 items-end">
                        <div
                            className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${isSender ? 
                                "ml-auto bg-violet-600 text-white rounded-br-none" : 
                                "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
                            }`}
                        >
                            <p className={`text-xs font-extralight italic line-clamp-1 ${isSender ? "text-right" : "text-left"}`}>
                                {message.user.name.split(" ")[0]} • {new Date(message.timestamp).toLocaleString()}
                            </p>
                            <div className="flex space-x-2">
                                <p>{message.translated?.[language] || message.input}</p>
                                {!message.translated && <LoadingSpinner />}
                            </div>
                        </div>
                        <UserAvatar name={message.user.name} image={message.user.image} className={`${!isSender && "-order-1"}`}/>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />  {/* reference to the last message of the chat. It is used to scroll to the last message of the chat. */}
        </div>
    );
}

export default ChatMessages;