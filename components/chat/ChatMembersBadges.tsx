"use client";

// chat/ChatMembersBadges.tsx is a component that displays the badges of the chat members. It is used to display the badges of the chat members.
import {ChatMembers, listChatMembersRef} from "@/lib/converters/ChatMembers";
import {useCollectionData} from "react-firebase-hooks/firestore";
import useIsAdmin from "@/hooks/useIsAdmin";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserAvatar from "@/components/user/UserAvatar";
import { Badge } from "../ui/badge";

function ChatMembersBadges({chatId}: {chatId: string}) {

    const [members, loading, error] = useCollectionData<ChatMembers>(
            listChatMembersRef(chatId)
        );

    const adminId = useIsAdmin({chatId});  // it returns the admin id of the chat. It is used to get the admin id of the chat.

    if (loading && !members) return <LoadingSpinner />;

    return (
        !loading && (
            <div className="p-2 border rounded-xl m-3">
                <div className="flex flex-wrap justify-center md:justify-start items-center p-2 gap-2">
                    {members?.map((member) => (
                        <Badge
                            variant="secondary"
                            key={member.email}
                            className="h-14 p-5 pl-2 pr-5 flex space-x-2"
                        >
                            <div className="flex item-center space-x-2">
                                <UserAvatar name={member.email} image={member.image} />
                            </div>
                            <div>
                                <p>{member.email}</p>
                                {member.userId === adminId && (
                                    <p className="text-indigo-500 animate-pulse">Admin</p>
                                )}
                            </div>
                        </Badge>
                    ))}
                </div>
            </div>
        )
    );
}

export default ChatMembersBadges;